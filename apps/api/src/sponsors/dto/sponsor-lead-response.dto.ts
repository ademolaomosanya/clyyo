import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApplicationStatus, RegistrationStatus } from "@prisma/client";

export class SponsorLeadResponseDto {
  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiProperty({ example: "Ada Builder" })
  name!: string | null;

  @ApiProperty({ example: "ada@example.com" })
  email!: string;

  @ApiProperty({ example: "registered", enum: RegistrationStatus })
  registrationStatus!: RegistrationStatus;

  @ApiPropertyOptional({ example: "accepted", enum: ApplicationStatus })
  applicationStatus!: ApplicationStatus | null;

  @ApiProperty({ example: ["React", "Node.js"], isArray: true })
  skills!: string[];

  @ApiProperty({ example: ["Find teammates", "Ship an MVP"], isArray: true })
  goals!: string[];

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  registeredAt!: string;
}
