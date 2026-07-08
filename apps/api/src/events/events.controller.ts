import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventResponseDto } from "./dto/event-response.dto";
import { EventsService } from "./events.service";

@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: "List events" })
  @ApiOkResponse({
    description: "Events returned successfully.",
    type: EventResponseDto,
    isArray: true
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(":eventId")
  @ApiOperation({ summary: "Get one event by ID" })
  @ApiOkResponse({
    description: "Event returned successfully.",
    type: EventResponseDto
  })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findOne(@Param("eventId") eventId: string) {
    return this.eventsService.findOne(eventId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.organizer, UserRole.admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create an event" })
  @ApiCreatedResponse({
    description: "Event created successfully.",
    type: EventResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only organizer or admin users can create events." })
  create(@Body() createEventDto: CreateEventDto, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.eventsService.create(createEventDto, currentUser);
  }
}
