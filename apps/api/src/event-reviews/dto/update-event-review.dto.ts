import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class UpdateEventReviewDto {
  @ApiPropertyOptional({
    example: 4,
    minimum: 1,
    maximum: 5
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    example: "Updated after thinking more about the schedule."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @IsOptional()
  comment?: string;
}
