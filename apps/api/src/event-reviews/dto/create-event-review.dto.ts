import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateEventReviewDto {
  @ApiProperty({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: "Participant rating for the completed event."
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiPropertyOptional({
    example: "Great venue, helpful mentors, and the team matching worked well."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @IsOptional()
  comment?: string;
}
