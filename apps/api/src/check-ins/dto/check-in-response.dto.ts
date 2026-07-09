import { ApiProperty } from "@nestjs/swagger";
import { RegistrationStatus } from "@prisma/client";

export class CheckInResponseDto {
  @ApiProperty({ example: "clx123registration" })
  id!: string;

  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "checked_in", enum: RegistrationStatus })
  status!: RegistrationStatus;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  updatedAt!: string;
}
