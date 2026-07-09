import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationType, Prisma, Registration, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async registerForEvent(eventId: string, currentUser: AuthenticatedUser) {
    if (currentUser.role !== UserRole.participant) {
      throw new ForbiddenException("Only participant users can register for events.");
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
      const registration = await this.prisma.registration.create({
        data: {
          eventId,
          userId: currentUser.id
        }
      });

      await this.notificationsService.createForUser({
        userId: currentUser.id,
        type: NotificationType.registration_created,
        title: "Registration confirmed",
        body: `You are registered for ${event.title}.`,
        metadata: {
          eventId,
          registrationId: registration.id
        }
      });

      return this.toResponse(registration);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException("You are already registered for this event.");
      }

      throw error;
    }
  }

  async findEventRegistrations(eventId: string, currentUser: AuthenticatedUser) {
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
      throw new ForbiddenException("Only this event's organizer or an admin can view registrations.");
    }

    const registrations = await this.prisma.registration.findMany({
      where: {
        eventId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return registrations.map((registration) => this.toResponse(registration));
  }

  async findMyRegistrations(currentUser: AuthenticatedUser) {
    const registrations = await this.prisma.registration.findMany({
      where: {
        userId: currentUser.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return registrations.map((registration) => this.toResponse(registration));
  }

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }

  private toResponse(registration: Registration) {
    return {
      id: registration.id,
      userId: registration.userId,
      eventId: registration.eventId,
      status: registration.status,
      createdAt: registration.createdAt.toISOString()
    };
  }
}
