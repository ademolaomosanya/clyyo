import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { CreateEventReviewDto } from "./dto/create-event-review.dto";
import { EventReviewResponseDto } from "./dto/event-review-response.dto";
import { EventReviewSummaryResponseDto } from "./dto/event-review-summary-response.dto";
import { UpdateEventReviewDto } from "./dto/update-event-review.dto";
import { EventReviewsService } from "./event-reviews.service";

@ApiTags("Event Reviews")
@Controller()
export class EventReviewsController {
  constructor(private readonly eventReviewsService: EventReviewsService) {}

  @Post("events/:eventId/reviews")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Review a completed event" })
  @ApiCreatedResponse({
    description: "Event review created successfully.",
    type: EventReviewResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only registered participants can review completed events." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  @ApiConflictResponse({ description: "The participant already reviewed this event." })
  create(
    @Param("eventId") eventId: string,
    @Body() createEventReviewDto: CreateEventReviewDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.eventReviewsService.create(eventId, createEventReviewDto, currentUser);
  }

  @Get("events/:eventId/reviews")
  @ApiOperation({ summary: "List reviews for an event" })
  @ApiOkResponse({
    description: "Event reviews returned successfully.",
    type: EventReviewSummaryResponseDto
  })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventReviews(@Param("eventId") eventId: string) {
    return this.eventReviewsService.findEventReviews(eventId);
  }

  @Get("me/event-reviews")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "List event reviews written by the current user" })
  @ApiOkResponse({
    description: "Current user's event reviews returned successfully.",
    type: EventReviewResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  findMyEventReviews(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.eventReviewsService.findMyEventReviews(currentUser);
  }

  @Patch("events/:eventId/reviews/me")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update the current user's event review" })
  @ApiOkResponse({
    description: "Event review updated successfully.",
    type: EventReviewResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiNotFoundResponse({ description: "The current user has not reviewed this event." })
  updateMyReview(
    @Param("eventId") eventId: string,
    @Body() updateEventReviewDto: UpdateEventReviewDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.eventReviewsService.updateMyReview(eventId, updateEventReviewDto, currentUser);
  }
}
