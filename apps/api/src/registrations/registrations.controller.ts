import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
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
import { RegistrationResponseDto } from "./dto/registration-response.dto";
import { RegistrationsService } from "./registrations.service";

@ApiTags("Registrations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post("events/:eventId/register")
  @ApiOperation({ summary: "Register the current participant for an event" })
  @ApiCreatedResponse({
    description: "Registration created successfully.",
    type: RegistrationResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only participant users can register for events." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  @ApiConflictResponse({ description: "The participant is already registered for this event." })
  registerForEvent(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.registrationsService.registerForEvent(eventId, currentUser);
  }

  @Get("events/:eventId/registrations")
  @ApiOperation({ summary: "List registrations for an event" })
  @ApiOkResponse({
    description: "Registrations returned successfully.",
    type: RegistrationResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can view registrations." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventRegistrations(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.registrationsService.findEventRegistrations(eventId, currentUser);
  }

  @Get("me/registrations")
  @ApiOperation({ summary: "List registrations for the current user" })
  @ApiOkResponse({
    description: "Current user's registrations returned successfully.",
    type: RegistrationResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  findMyRegistrations(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.registrationsService.findMyRegistrations(currentUser);
  }
}
