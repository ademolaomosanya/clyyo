import { ApiProperty } from "@nestjs/swagger";
import { EventReviewResponseDto } from "./event-review-response.dto";

export class EventReviewSummaryResponseDto {
  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: 12 })
  totalReviews!: number;

  @ApiProperty({ example: 4.58 })
  averageRating!: number;

  @ApiProperty({ type: () => [EventReviewResponseDto] })
  reviews!: EventReviewResponseDto[];
}
