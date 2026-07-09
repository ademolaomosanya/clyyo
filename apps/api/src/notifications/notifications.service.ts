import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Notification, NotificationType, Prisma } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";

type CreateNotificationInput = {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  metadata?: Prisma.InputJsonValue;
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(input: CreateNotificationInput) {
    return this.prisma.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body,
        metadata: input.metadata
      }
    });
  }

  async findMine(currentUser: AuthenticatedUser) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId: currentUser.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return notifications.map((notification) => this.toResponse(notification));
  }

  async markAsRead(notificationId: string, currentUser: AuthenticatedUser) {
    const notification = await this.findOwnedNotification(notificationId, currentUser);

    const updatedNotification = await this.prisma.notification.update({
      where: {
        id: notification.id
      },
      data: {
        readAt: notification.readAt ?? new Date()
      }
    });

    return this.toResponse(updatedNotification);
  }

  async markAsUnread(notificationId: string, currentUser: AuthenticatedUser) {
    const notification = await this.findOwnedNotification(notificationId, currentUser);

    const updatedNotification = await this.prisma.notification.update({
      where: {
        id: notification.id
      },
      data: {
        readAt: null
      }
    });

    return this.toResponse(updatedNotification);
  }

  private async findOwnedNotification(notificationId: string, currentUser: AuthenticatedUser) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    });

    if (!notification) {
      throw new NotFoundException(`Notification ${notificationId} was not found.`);
    }

    if (notification.userId !== currentUser.id) {
      throw new ForbiddenException("You can only update your own notifications.");
    }

    return notification;
  }

  private toResponse(notification: Notification) {
    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      metadata: notification.metadata,
      readAt: notification.readAt?.toISOString() ?? null,
      createdAt: notification.createdAt.toISOString()
    };
  }
}
