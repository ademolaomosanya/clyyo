import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
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
import { AnalyticsService } from "./analytics.service";
import { EventAnalyticsResponseDto } from "./dto/event-analytics-response.dto";

@ApiTags("Analytics")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("events/:eventId/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: "Get organizer analytics for an event" })
  @ApiOkResponse({
    description: "Event analytics returned successfully.",
    type: EventAnalyticsResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can view analytics." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  getEventAnalytics(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.analyticsService.getEventAnalytics(eventId, currentUser);
  }
}
