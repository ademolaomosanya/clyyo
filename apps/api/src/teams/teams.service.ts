import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationType, Prisma, RegistrationStatus, Team, TeamMember, TeamMemberRole, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { AddTeamMemberDto } from "./dto/add-team-member.dto";
import { CreateTeamDto } from "./dto/create-team.dto";

type TeamWithMembers = Team & {
  members: TeamMember[];
};

@Injectable()
export class TeamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(eventId: string, createTeamDto: CreateTeamDto, currentUser: AuthenticatedUser) {
    await this.assertCanManageEvent(eventId, currentUser, "create teams");

    try {
      const team = await this.prisma.team.create({
        data: {
          eventId,
          name: createTeamDto.name,
          description: createTeamDto.description,
          maxSize: createTeamDto.maxSize ?? 4
        },
        include: {
          members: true
        }
      });

      return this.toTeamResponse(team);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException("A team with this name already exists for this event.");
      }

      throw error;
    }
  }

  async findEventTeams(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertEventVisibleToUser(eventId, currentUser);

    const teams = await this.prisma.team.findMany({
      where: {
        eventId
      },
      include: {
        members: {
          orderBy: {
            createdAt: "asc"
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return teams.map((team) => this.toTeamResponse(team));
  }

  async addMember(
    eventId: string,
    teamId: string,
    addTeamMemberDto: AddTeamMemberDto,
    currentUser: AuthenticatedUser
  ) {
    await this.assertCanManageEvent(eventId, currentUser, "manage teams");

    const team = await this.prisma.team.findUnique({
      where: {
        id: teamId
      }
    });

    if (!team || team.eventId !== eventId) {
      throw new NotFoundException("Team was not found for this event.");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: addTeamMemberDto.userId
      }
    });

    if (!user || user.role !== UserRole.participant) {
      throw new NotFoundException("Participant user was not found.");
    }

    const registration = await this.prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: addTeamMemberDto.userId,
          eventId
        }
      }
    });

    if (!registration || registration.status === RegistrationStatus.cancelled) {
      throw new ForbiddenException("Participant must be registered for this event before joining a team.");
    }

    const existingEventTeamMember = await this.prisma.teamMember.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: addTeamMemberDto.userId
        }
      }
    });

    if (existingEventTeamMember) {
      throw new ConflictException("Participant is already on a team for this event.");
    }

    const memberCount = await this.prisma.teamMember.count({
      where: {
        teamId
      }
    });

    if (memberCount >= team.maxSize) {
      throw new ConflictException("Team is already full.");
    }

    const teamMember = await this.prisma.teamMember.create({
      data: {
        eventId,
        teamId,
        userId: addTeamMemberDto.userId,
        role: addTeamMemberDto.role ?? TeamMemberRole.member
      }
    });

    await this.notificationsService.createForUser({
      userId: addTeamMemberDto.userId,
      type: NotificationType.team_member_added,
      title: "You were added to a team",
      body: `You were added to ${team.name}.`,
      metadata: {
        eventId,
        teamId,
        teamMemberId: teamMember.id
      }
    });

    return this.toTeamMemberResponse(teamMember);
  }

  async findMyTeams(currentUser: AuthenticatedUser) {
    const memberships = await this.prisma.teamMember.findMany({
      where: {
        userId: currentUser.id
      },
      include: {
        team: {
          include: {
            members: {
              orderBy: {
                createdAt: "asc"
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return memberships.map((membership) => this.toTeamResponse(membership.team));
  }

  private async assertCanManageEvent(eventId: string, currentUser: AuthenticatedUser, action: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    const canManage =
      currentUser.role === UserRole.admin ||
      (currentUser.role === UserRole.organizer && event.organizerId === currentUser.id);

    if (!canManage) {
      throw new ForbiddenException(`Only this event's organizer or an admin can ${action}.`);
    }
  }

  private async assertEventVisibleToUser(eventId: string, currentUser: AuthenticatedUser) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    if (
      currentUser.role === UserRole.admin ||
      (currentUser.role === UserRole.organizer && event.organizerId === currentUser.id)
    ) {
      return;
    }

    const registration = await this.prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: currentUser.id,
          eventId
        }
      }
    });

    if (!registration || registration.status === RegistrationStatus.cancelled) {
      throw new ForbiddenException("Only registered participants, this event's organizer, or an admin can view teams.");
    }
  }

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }

  private toTeamResponse(team: TeamWithMembers) {
    return {
      id: team.id,
      eventId: team.eventId,
      name: team.name,
      description: team.description,
      maxSize: team.maxSize,
      status: team.status,
      members: team.members.map((member) => this.toTeamMemberResponse(member)),
      createdAt: team.createdAt.toISOString()
    };
  }

  private toTeamMemberResponse(teamMember: TeamMember) {
    return {
      id: teamMember.id,
      teamId: teamMember.teamId,
      eventId: teamMember.eventId,
      userId: teamMember.userId,
      role: teamMember.role,
      createdAt: teamMember.createdAt.toISOString()
    };
  }
}
