import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
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
import { CreateSponsorshipDto } from "./dto/create-sponsorship.dto";
import { SponsorAnalyticsResponseDto } from "./dto/sponsor-analytics-response.dto";
import { SponsorLeadResponseDto } from "./dto/sponsor-lead-response.dto";
import { SponsoredEventResponseDto } from "./dto/sponsored-event-response.dto";
import { SponsorshipResponseDto } from "./dto/sponsorship-response.dto";
import { SponsorsService } from "./sponsors.service";

@ApiTags("Sponsors")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post("events/:eventId/sponsorships")
  @ApiOperation({ summary: "Attach a sponsor to an event" })
  @ApiCreatedResponse({
    description: "Sponsorship created successfully.",
    type: SponsorshipResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can manage sponsorships." })
  @ApiNotFoundResponse({ description: "Event or sponsor user was not found." })
  @ApiConflictResponse({ description: "Sponsor is already attached to this event." })
  createSponsorship(
    @Param("eventId") eventId: string,
    @Body() createSponsorshipDto: CreateSponsorshipDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.sponsorsService.createSponsorship(eventId, createSponsorshipDto, currentUser);
  }

  @Get("events/:eventId/sponsorships")
  @ApiOperation({ summary: "List sponsorships for an event" })
  @ApiOkResponse({
    description: "Sponsorships returned successfully.",
    type: SponsorshipResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only sponsors, this event's organizer, or an admin can view sponsorships." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventSponsorships(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.sponsorsService.findEventSponsorships(eventId, currentUser);
  }

  @Get("me/sponsored-events")
  @ApiOperation({ summary: "List events sponsored by the current sponsor" })
  @ApiOkResponse({
    description: "Sponsored events returned successfully.",
    type: SponsoredEventResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only sponsor users can view sponsored events." })
  findMySponsoredEvents(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.sponsorsService.findMySponsoredEvents(currentUser);
  }

  @Get("events/:eventId/sponsor-leads")
  @ApiOperation({ summary: "List sponsor leads for an event" })
  @ApiOkResponse({
    description: "Sponsor leads returned successfully.",
    type: SponsorLeadResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only active event sponsors, the organizer, or an admin can view leads." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventLeads(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.sponsorsService.findEventLeads(eventId, currentUser);
  }

  @Get("events/:eventId/sponsor-analytics")
  @ApiOperation({ summary: "Get sponsor-facing analytics for an event" })
  @ApiOkResponse({
    description: "Sponsor analytics returned successfully.",
    type: SponsorAnalyticsResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only active event sponsors, the organizer, or an admin can view sponsor analytics." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  getSponsorAnalytics(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.sponsorsService.getSponsorAnalytics(eventId, currentUser);
  }
}
