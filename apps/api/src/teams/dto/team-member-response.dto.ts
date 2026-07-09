import { ApiProperty } from "@nestjs/swagger";
import { TeamMemberRole } from "@prisma/client";

export class TeamMemberResponseDto {
  @ApiProperty({ example: "clx123teammember" })
  id!: string;

  @ApiProperty({ example: "clx123team" })
  teamId!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiProperty({ example: "member", enum: TeamMemberRole })
  role!: TeamMemberRole;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
