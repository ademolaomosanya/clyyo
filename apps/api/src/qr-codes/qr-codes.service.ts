import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class QrCodesService {
  constructor(private readonly prisma: PrismaService) {}

  async getRegistrationQr(registrationId: string, currentUser: AuthenticatedUser) {
    const registration = await this.prisma.registration.findUnique({
      where: {
        id: registrationId
      }
    });

    if (!registration) {
      throw new NotFoundException(`Registration ${registrationId} was not found.`);
    }

    if (registration.userId !== currentUser.id) {
      throw new ForbiddenException("You can only view QR codes for your own registrations.");
    }

    return {
      registrationId: registration.id,
      eventId: registration.eventId,
      qrPayload: this.createRegistrationPayload(registration.id)
    };
  }

  private createRegistrationPayload(registrationId: string) {
    return `clyyo:registration:${registrationId}`;
  }
}
