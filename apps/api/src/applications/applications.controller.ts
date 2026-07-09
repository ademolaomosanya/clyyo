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
import { ApplicationsService } from "./applications.service";
import { ApplicationResponseDto } from "./dto/application-response.dto";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationStatusDto } from "./dto/update-application-status.dto";

@ApiTags("Applications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post("events/:eventId/applications")
  @ApiOperation({ summary: "Submit an application for an event" })
  @ApiCreatedResponse({
    description: "Application submitted successfully.",
    type: ApplicationResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only participant users can apply to events." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  @ApiConflictResponse({ description: "The participant already applied to this event." })
  create(
    @Param("eventId") eventId: string,
    @Body() createApplicationDto: CreateApplicationDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.applicationsService.create(eventId, createApplicationDto, currentUser);
  }

  @Get("events/:eventId/applications")
  @ApiOperation({ summary: "List applications for an event" })
  @ApiOkResponse({
    description: "Applications returned successfully.",
    type: ApplicationResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can view applications." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventApplications(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.applicationsService.findEventApplications(eventId, currentUser);
  }

  @Get("me/applications")
  @ApiOperation({ summary: "List applications for the current user" })
  @ApiOkResponse({
    description: "Current user's applications returned successfully.",
    type: ApplicationResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  findMyApplications(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.applicationsService.findMyApplications(currentUser);
  }

  @Patch("events/:eventId/applications/:applicationId/status")
  @ApiOperation({ summary: "Review an event application" })
  @ApiOkResponse({
    description: "Application status updated successfully.",
    type: ApplicationResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can review applications." })
  @ApiNotFoundResponse({ description: "Event or application was not found." })
  updateStatus(
    @Param("eventId") eventId: string,
    @Param("applicationId") applicationId: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.applicationsService.updateStatus(eventId, applicationId, updateApplicationStatusDto, currentUser);
  }
}
