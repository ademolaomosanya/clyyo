import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Application, NotificationType, Prisma, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationStatusDto } from "./dto/update-application-status.dto";

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(eventId: string, createApplicationDto: CreateApplicationDto, currentUser: AuthenticatedUser) {
    if (currentUser.role !== UserRole.participant) {
      throw new ForbiddenException("Only participant users can apply to events.");
    }

    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    try {
      const application = await this.prisma.application.create({
        data: {
          eventId,
          userId: currentUser.id,
          motivation: createApplicationDto.motivation,
          skills: createApplicationDto.skills,
          goals: createApplicationDto.goals
        }
      });

      return this.toResponse(application);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException("You already submitted an application for this event.");
      }

      throw error;
    }
  }

  async findEventApplications(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertCanManageEvent(eventId, currentUser, "view applications");

    const applications = await this.prisma.application.findMany({
      where: {
        eventId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return applications.map((application) => this.toResponse(application));
  }

  async findMyApplications(currentUser: AuthenticatedUser) {
    const applications = await this.prisma.application.findMany({
      where: {
        userId: currentUser.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return applications.map((application) => this.toResponse(application));
  }

  async updateStatus(
    eventId: string,
    applicationId: string,
    updateApplicationStatusDto: UpdateApplicationStatusDto,
    currentUser: AuthenticatedUser
  ) {
    await this.assertCanManageEvent(eventId, currentUser, "review applications");

    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId
      }
    });

    if (!application || application.eventId !== eventId) {
      throw new NotFoundException("Application was not found for this event.");
    }

    const updatedApplication = await this.prisma.application.update({
      where: {
        id: application.id
      },
      data: {
        status: updateApplicationStatusDto.status
      }
    });

    if (application.status !== updatedApplication.status) {
      await this.notificationsService.createForUser({
        userId: updatedApplication.userId,
        type: NotificationType.application_status_changed,
        title: "Application status updated",
        body: `Your application is now ${updatedApplication.status}.`,
        metadata: {
          eventId,
          applicationId: updatedApplication.id,
          status: updatedApplication.status
        }
      });
    }

    return this.toResponse(updatedApplication);
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

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }

  private toResponse(application: Application) {
    return {
      id: application.id,
      userId: application.userId,
      eventId: application.eventId,
      motivation: application.motivation,
      skills: application.skills,
      goals: application.goals,
      status: application.status,
      createdAt: application.createdAt.toISOString()
    };
  }
}
