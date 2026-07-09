import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
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
import { CheckInsService } from "./check-ins.service";
import { CheckInResponseDto } from "./dto/check-in-response.dto";
import { CreateCheckInDto } from "./dto/create-check-in.dto";
import { ScanCheckInDto } from "./dto/scan-check-in.dto";

@ApiTags("Check-ins")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("events/:eventId/check-ins")
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  @ApiOperation({ summary: "Check in an attendee for an event" })
  @ApiCreatedResponse({
    description: "Attendee checked in successfully.",
    type: CheckInResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can check in attendees." })
  @ApiNotFoundResponse({ description: "Event or registration was not found." })
  @ApiConflictResponse({ description: "Registration is already checked in or cannot be checked in." })
  create(
    @Param("eventId") eventId: string,
    @Body() createCheckInDto: CreateCheckInDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.checkInsService.create(eventId, createCheckInDto, currentUser);
  }

  @Post("scan")
  @ApiOperation({ summary: "Check in an attendee by scanned QR payload" })
  @ApiCreatedResponse({
    description: "Attendee checked in successfully.",
    type: CheckInResponseDto
  })
  @ApiBadRequestResponse({ description: "QR payload format is invalid." })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can check in attendees." })
  @ApiNotFoundResponse({ description: "Event or registration was not found." })
  @ApiConflictResponse({ description: "Registration is already checked in or cannot be checked in." })
  scan(
    @Param("eventId") eventId: string,
    @Body() scanCheckInDto: ScanCheckInDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.checkInsService.scan(eventId, scanCheckInDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: "List checked-in attendees for an event" })
  @ApiOkResponse({
    description: "Check-ins returned successfully.",
    type: CheckInResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can view check-ins." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventCheckIns(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.checkInsService.findEventCheckIns(eventId, currentUser);
  }
}
