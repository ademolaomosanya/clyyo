import { ApiProperty } from "@nestjs/swagger";
import { ApplicationStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateApplicationStatusDto {
  @ApiProperty({
    example: "accepted",
    enum: ApplicationStatus,
    description: "Organizer review decision for this application."
  })
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}
