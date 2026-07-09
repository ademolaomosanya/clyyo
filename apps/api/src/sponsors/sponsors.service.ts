import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationType, Prisma, RegistrationStatus, Sponsorship, SponsorshipStatus, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateSponsorshipDto } from "./dto/create-sponsorship.dto";

type SponsorshipWithEvent = Sponsorship & {
  event: {
    id: string;
    title: string;
    type: string;
    status: string;
    location: string;
    startsAt: Date;
    endsAt: Date;
  };
};

@Injectable()
export class SponsorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async createSponsorship(
    eventId: string,
    createSponsorshipDto: CreateSponsorshipDto,
    currentUser: AuthenticatedUser
  ) {
    await this.assertCanManageEvent(eventId, currentUser, "manage sponsorships");

    const sponsor = await this.prisma.user.findUnique({
      where: {
        id: createSponsorshipDto.sponsorId
      }
    });

    if (!sponsor || sponsor.role !== UserRole.sponsor) {
      throw new NotFoundException("Sponsor user was not found.");
    }

    try {
      const sponsorship = await this.prisma.sponsorship.create({
        data: {
          eventId,
          sponsorId: createSponsorshipDto.sponsorId,
          packageName: createSponsorshipDto.packageName,
          visibilityTier: createSponsorshipDto.visibilityTier
        }
      });

      await this.notificationsService.createForUser({
        userId: createSponsorshipDto.sponsorId,
        type: NotificationType.sponsorship_created,
        title: "Sponsorship activated",
        body: `You were added as a sponsor for this event.`,
        metadata: {
          eventId,
          sponsorshipId: sponsorship.id,
          packageName: sponsorship.packageName,
          visibilityTier: sponsorship.visibilityTier
        }
      });

      return this.toSponsorshipResponse(sponsorship);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException("This sponsor is already attached to this event.");
      }

      throw error;
    }
  }

  async findEventSponsorships(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertCanViewSponsorData(eventId, currentUser, "view sponsorships");

    const sponsorships = await this.prisma.sponsorship.findMany({
      where: {
        eventId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return sponsorships.map((sponsorship) => this.toSponsorshipResponse(sponsorship));
  }

  async findMySponsoredEvents(currentUser: AuthenticatedUser) {
    if (currentUser.role !== UserRole.sponsor) {
      throw new ForbiddenException("Only sponsor users can view sponsored events.");
    }

    const sponsorships = await this.prisma.sponsorship.findMany({
      where: {
        sponsorId: currentUser.id,
        status: SponsorshipStatus.active
      },
      include: {
        event: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return sponsorships.map((sponsorship) => this.toSponsoredEventResponse(sponsorship));
  }

  async findEventLeads(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertCanViewSponsorData(eventId, currentUser, "view sponsor leads");

    const registrations = await this.prisma.registration.findMany({
      where: {
        eventId,
        status: {
          not: RegistrationStatus.cancelled
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const applications = await this.prisma.application.findMany({
      where: {
        eventId,
        userId: {
          in: registrations.map((registration) => registration.userId)
        }
      }
    });
    const applicationsByUserId = new Map(applications.map((application) => [application.userId, application]));

    return registrations.map((registration) => {
      const application = applicationsByUserId.get(registration.userId);

      return {
        userId: registration.userId,
        name: registration.user.name,
        email: registration.user.email,
        registrationStatus: registration.status,
        applicationStatus: application?.status ?? null,
        skills: application?.skills ?? [],
        goals: application?.goals ?? [],
        registeredAt: registration.createdAt.toISOString()
      };
    });
  }

  async getSponsorAnalytics(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertCanViewSponsorData(eventId, currentUser, "view sponsor analytics");

    const [sponsorCount, leadCount, applicationCount, activeRegistrations, checkedInCount, teamCount] =
      await Promise.all([
        this.prisma.sponsorship.count({
          where: {
            eventId,
            status: SponsorshipStatus.active
          }
        }),
        this.prisma.registration.count({
          where: {
            eventId,
            status: {
              not: RegistrationStatus.cancelled
            }
          }
        }),
        this.prisma.application.count({
          where: {
            eventId
          }
        }),
        this.prisma.registration.count({
          where: {
            eventId,
            status: {
              not: RegistrationStatus.cancelled
            }
          }
        }),
        this.prisma.registration.count({
          where: {
            eventId,
            status: RegistrationStatus.checked_in
          }
        }),
        this.prisma.team.count({
          where: {
            eventId
          }
        })
      ]);

    const checkInRate = activeRegistrations === 0 ? 0 : (checkedInCount / activeRegistrations) * 100;

    return {
      eventId,
      sponsorCount,
      leadCount,
      applicationCount,
      activeRegistrations,
      checkedInCount,
      checkInRate: Number(checkInRate.toFixed(2)),
      teamCount
    };
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

  private async assertCanViewSponsorData(eventId: string, currentUser: AuthenticatedUser, action: string) {
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

    if (currentUser.role !== UserRole.sponsor) {
      throw new ForbiddenException(`Only sponsors, this event's organizer, or an admin can ${action}.`);
    }

    const sponsorship = await this.prisma.sponsorship.findUnique({
      where: {
        eventId_sponsorId: {
          eventId,
          sponsorId: currentUser.id
        }
      }
    });

    if (!sponsorship || sponsorship.status !== SponsorshipStatus.active) {
      throw new ForbiddenException(`Only active sponsors for this event can ${action}.`);
    }
  }

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }

  private toSponsorshipResponse(sponsorship: Sponsorship) {
    return {
      id: sponsorship.id,
      eventId: sponsorship.eventId,
      sponsorId: sponsorship.sponsorId,
      packageName: sponsorship.packageName,
      visibilityTier: sponsorship.visibilityTier,
      status: sponsorship.status,
      createdAt: sponsorship.createdAt.toISOString()
    };
  }

  private toSponsoredEventResponse(sponsorship: SponsorshipWithEvent) {
    return {
      sponsorshipId: sponsorship.id,
      packageName: sponsorship.packageName,
      visibilityTier: sponsorship.visibilityTier,
      sponsorshipStatus: sponsorship.status,
      eventId: sponsorship.event.id,
      title: sponsorship.event.title,
      type: sponsorship.event.type,
      status: sponsorship.event.status,
      location: sponsorship.event.location,
      startsAt: sponsorship.event.startsAt.toISOString(),
      endsAt: sponsorship.event.endsAt.toISOString()
    };
  }
}
