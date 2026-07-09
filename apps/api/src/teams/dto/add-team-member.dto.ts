import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TeamMemberRole } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddTeamMemberDto {
  @ApiProperty({
    example: "clx123user",
    description: "Participant user ID to add to the team."
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiPropertyOptional({
    example: "member",
    enum: TeamMemberRole
  })
  @IsEnum(TeamMemberRole)
  @IsOptional()
  role?: TeamMemberRole;
}
