import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
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
import { NotificationResponseDto } from "./dto/notification-response.dto";
import { NotificationsService } from "./notifications.service";

@ApiTags("Notifications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("me/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: "List notifications for the current user" })
  @ApiOkResponse({
    description: "Current user's notifications returned successfully.",
    type: NotificationResponseDto,
    isArray: true
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  findMine(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.notificationsService.findMine(currentUser);
  }

  @Patch(":notificationId/read")
  @ApiOperation({ summary: "Mark a notification as read" })
  @ApiOkResponse({
    description: "Notification marked as read successfully.",
    type: NotificationResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "You can only update your own notifications." })
  @ApiNotFoundResponse({ description: "Notification was not found." })
  markAsRead(@Param("notificationId") notificationId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.notificationsService.markAsRead(notificationId, currentUser);
  }

  @Patch(":notificationId/unread")
  @ApiOperation({ summary: "Mark a notification as unread" })
  @ApiOkResponse({
    description: "Notification marked as unread successfully.",
    type: NotificationResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "You can only update your own notifications." })
  @ApiNotFoundResponse({ description: "Notification was not found." })
  markAsUnread(@Param("notificationId") notificationId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.notificationsService.markAsUnread(notificationId, currentUser);
  }
}
