import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TeamStatus } from "@prisma/client";
import { TeamMemberResponseDto } from "./team-member-response.dto";

export class TeamResponseDto {
  @ApiProperty({ example: "clx123team" })
  id!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "Team Atlas" })
  name!: string;

  @ApiPropertyOptional({ example: "Builders focused on QR check-in and event analytics." })
  description!: string | null;

  @ApiProperty({ example: 4 })
  maxSize!: number;

  @ApiProperty({ example: "forming", enum: TeamStatus })
  status!: TeamStatus;

  @ApiProperty({ type: () => [TeamMemberResponseDto] })
  members!: TeamMemberResponseDto[];

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
