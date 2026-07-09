import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationStatus, RegistrationStatus, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEventAnalytics(eventId: string, currentUser: AuthenticatedUser) {
    await this.assertCanViewAnalytics(eventId, currentUser);

    const [
      totalApplications,
      submittedApplications,
      acceptedApplications,
      rejectedApplications,
      waitlistedApplications,
      totalRegistrations,
      activeRegistrations,
      cancelledRegistrations,
      checkedInCount,
      teamCount,
      participantsInTeams
    ] = await Promise.all([
      this.countApplications(eventId),
      this.countApplications(eventId, ApplicationStatus.submitted),
      this.countApplications(eventId, ApplicationStatus.accepted),
      this.countApplications(eventId, ApplicationStatus.rejected),
      this.countApplications(eventId, ApplicationStatus.waitlisted),
      this.countRegistrations(eventId),
      this.prisma.registration.count({
        where: {
          eventId,
          status: {
            not: RegistrationStatus.cancelled
          }
        }
      }),
      this.countRegistrations(eventId, RegistrationStatus.cancelled),
      this.countRegistrations(eventId, RegistrationStatus.checked_in),
      this.prisma.team.count({
        where: {
          eventId
        }
      }),
      this.prisma.teamMember.count({
        where: {
          eventId
        }
      })
    ]);

    const checkInRate = activeRegistrations === 0 ? 0 : (checkedInCount / activeRegistrations) * 100;
    const unassignedParticipants = Math.max(activeRegistrations - participantsInTeams, 0);

    return {
      eventId,
      totalApplications,
      submittedApplications,
      acceptedApplications,
      rejectedApplications,
      waitlistedApplications,
      totalRegistrations,
      activeRegistrations,
      cancelledRegistrations,
      checkedInCount,
      checkInRate: Number(checkInRate.toFixed(2)),
      teamCount,
      participantsInTeams,
      unassignedParticipants
    };
  }

  private countApplications(eventId: string, status?: ApplicationStatus) {
    return this.prisma.application.count({
      where: {
        eventId,
        ...(status ? { status } : {})
      }
    });
  }

  private countRegistrations(eventId: string, status?: RegistrationStatus) {
    return this.prisma.registration.count({
      where: {
        eventId,
        ...(status ? { status } : {})
      }
    });
  }

  private async assertCanViewAnalytics(eventId: string, currentUser: AuthenticatedUser) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    const canView =
      currentUser.role === UserRole.admin ||
      (currentUser.role === UserRole.organizer && event.organizerId === currentUser.id);

    if (!canView) {
      throw new ForbiddenException("Only this event's organizer or an admin can view analytics.");
    }
  }
}
