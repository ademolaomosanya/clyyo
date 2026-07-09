import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EventReviewResponseDto {
  @ApiProperty({ example: "clx123eventreview" })
  id!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiPropertyOptional({ example: "Ada Builder" })
  authorName!: string | null;

  @ApiProperty({ example: 5 })
  rating!: number;

  @ApiPropertyOptional({ example: "Great venue, helpful mentors, and the team matching worked well." })
  comment!: string | null;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
