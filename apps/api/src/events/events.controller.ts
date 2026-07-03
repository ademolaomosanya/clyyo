import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @ApiOperation({ summary: "Create an event" })
  @ApiCreatedResponse({
    description: "Event created successfully.",
    type: EventResponseDto
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
