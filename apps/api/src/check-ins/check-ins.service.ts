import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationType, Registration, RegistrationStatus, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateCheckInDto } from "./dto/create-check-in.dto";
import { ScanCheckInDto } from "./dto/scan-check-in.dto";

@Injectable()
export class CheckInsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(eventId: string, createCheckInDto: CreateCheckInDto, currentUser: AuthenticatedUser) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    const canCheckIn =
      currentUser.role === UserRole.admin ||
      (currentUser.role === UserRole.organizer && event.organizerId === currentUser.id);

    if (!canCheckIn) {
      throw new ForbiddenException("Only this event's organizer or an admin can check in attendees.");
    }

    const registration = await this.prisma.registration.findUnique({
      where: {
        id: createCheckInDto.registrationId
      }
    });

    if (!registration || registration.eventId !== eventId) {
      throw new NotFoundException("Registration was not found for this event.");
    }

    if (registration.status === RegistrationStatus.checked_in) {
      throw new ConflictException("This registration is already checked in.");
    }

    if (registration.status === RegistrationStatus.cancelled) {
      throw new ConflictException("Cancelled registrations cannot be checked in.");
    }

    const updatedRegistration = await this.prisma.registration.update({
      where: {
        id: registration.id
      },
      data: {
        status: RegistrationStatus.checked_in
      }
    });

    await this.notificationsService.createForUser({
      userId: updatedRegistration.userId,
      type: NotificationType.check_in_completed,
      title: "Check-in complete",
      body: `You are checked in for ${event.title}.`,
      metadata: {
        eventId,
        registrationId: updatedRegistration.id
      }
    });

    return this.toResponse(updatedRegistration);
  }

  async scan(eventId: string, scanCheckInDto: ScanCheckInDto, currentUser: AuthenticatedUser) {
    const registrationId = this.parseRegistrationQrPayload(scanCheckInDto.qrPayload);

    return this.create(eventId, { registrationId }, currentUser);
  }

  async findEventCheckIns(eventId: string, currentUser: AuthenticatedUser) {
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
      throw new ForbiddenException("Only this event's organizer or an admin can view check-ins.");
    }

    const checkedInRegistrations = await this.prisma.registration.findMany({
      where: {
        eventId,
        status: RegistrationStatus.checked_in
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return checkedInRegistrations.map((registration) => this.toResponse(registration));
  }

  private toResponse(registration: Registration) {
    return {
      id: registration.id,
      userId: registration.userId,
      eventId: registration.eventId,
      status: registration.status,
      updatedAt: registration.updatedAt.toISOString()
    };
  }

  private parseRegistrationQrPayload(qrPayload: string) {
    const prefix = "clyyo:registration:";

    if (!qrPayload.startsWith(prefix)) {
      throw new BadRequestException("Invalid QR payload.");
    }

    const registrationId = qrPayload.slice(prefix.length).trim();

    if (!registrationId) {
      throw new BadRequestException("Invalid QR payload.");
    }

    return registrationId;
  }
}
