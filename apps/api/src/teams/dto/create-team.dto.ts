import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateTeamDto {
  @ApiProperty({
    example: "Team Atlas",
    description: "Team name inside the event."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({
    example: "Builders focused on QR check-in and event analytics."
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    example: 4,
    minimum: 2,
    maximum: 10,
    description: "Maximum number of participants allowed on the team."
  })
  @IsInt()
  @Min(2)
  @Max(10)
  @IsOptional()
  maxSize?: number;
}
