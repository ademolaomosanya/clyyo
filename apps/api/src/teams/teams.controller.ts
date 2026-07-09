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
import { AddTeamMemberDto } from "./dto/add-team-member.dto";
import { CreateTeamDto } from "./dto/create-team.dto";
import { TeamMemberResponseDto } from "./dto/team-member-response.dto";
import { TeamResponseDto } from "./dto/team-response.dto";
import { TeamsService } from "./teams.service";

@ApiTags("Teams")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post("events/:eventId/teams")
  @ApiOperation({ summary: "Create a team for an event" })
  @ApiCreatedResponse({
    description: "Team created successfully.",
    type: TeamResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only this event's organizer or an admin can create teams." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  @ApiConflictResponse({ description: "A team with this name already exists for this event." })
  create(
    @Param("eventId") eventId: string,
    @Body() createTeamDto: CreateTeamDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.teamsService.create(eventId, createTeamDto, currentUser);
  }

  @Get("events/:eventId/teams")
  @ApiOperation({ summary: "List teams for an event" })
  @ApiOkResponse({
    description: "Teams returned successfully.",
    type: TeamResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Only registered participants, this event's organizer, or an admin can view teams." })
  @ApiNotFoundResponse({ description: "Event was not found." })
  findEventTeams(@Param("eventId") eventId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.teamsService.findEventTeams(eventId, currentUser);
  }

  @Post("events/:eventId/teams/:teamId/members")
  @ApiOperation({ summary: "Add a participant to a team" })
  @ApiCreatedResponse({
    description: "Participant added to team successfully.",
    type: TeamMemberResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "Participant must be registered; only organizer/admin can manage teams." })
  @ApiNotFoundResponse({ description: "Event, team, or participant was not found." })
  @ApiConflictResponse({ description: "Participant is already on a team or the team is full." })
  addMember(
    @Param("eventId") eventId: string,
    @Param("teamId") teamId: string,
    @Body() addTeamMemberDto: AddTeamMemberDto,
    @CurrentUser() currentUser: AuthenticatedUser
  ) {
    return this.teamsService.addMember(eventId, teamId, addTeamMemberDto, currentUser);
  }

  @Get("me/teams")
  @ApiOperation({ summary: "List teams for the current user" })
  @ApiOkResponse({
    description: "Current user's teams returned successfully.",
    type: TeamResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  findMyTeams(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.teamsService.findMyTeams(currentUser);
  }
}
