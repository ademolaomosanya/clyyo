import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EventReview, NotificationType, Prisma, RegistrationStatus, User, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateEventReviewDto } from "./dto/create-event-review.dto";
import { UpdateEventReviewDto } from "./dto/update-event-review.dto";

type EventReviewWithUser = EventReview & {
  user: Pick<User, "name">;
};

@Injectable()
export class EventReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService
  ) {}

  async create(eventId: string, createEventReviewDto: CreateEventReviewDto, currentUser: AuthenticatedUser) {
    await this.assertCanReviewEvent(eventId, currentUser);

    try {
      const review = await this.prisma.eventReview.create({
        data: {
          eventId,
          userId: currentUser.id,
          rating: createEventReviewDto.rating,
          comment: createEventReviewDto.comment
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });

      const event = await this.prisma.event.findUnique({
        where: {
          id: eventId
        }
      });

      if (event?.organizerId) {
        await this.notificationsService.createForUser({
          userId: event.organizerId,
          type: NotificationType.event_review_submitted,
          title: "New event review",
          body: `A participant left a ${review.rating}-star review.`,
          metadata: {
            eventId,
            eventReviewId: review.id,
            rating: review.rating
          }
        });
      }

      return this.toResponse(review);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException("You already reviewed this event.");
      }

      throw error;
    }
  }

  async findEventReviews(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    const [reviews, ratingAggregate] = await Promise.all([
      this.prisma.eventReview.findMany({
        where: {
          eventId
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }),
      this.prisma.eventReview.aggregate({
        where: {
          eventId
        },
        _avg: {
          rating: true
        }
      })
    ]);

    return {
      eventId,
      totalReviews: reviews.length,
      averageRating: Number((ratingAggregate._avg.rating ?? 0).toFixed(2)),
      reviews: reviews.map((review) => this.toResponse(review))
    };
  }

  async findMyEventReviews(currentUser: AuthenticatedUser) {
    const reviews = await this.prisma.eventReview.findMany({
      where: {
        userId: currentUser.id
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return reviews.map((review) => this.toResponse(review));
  }

  async updateMyReview(eventId: string, updateEventReviewDto: UpdateEventReviewDto, currentUser: AuthenticatedUser) {
    const review = await this.prisma.eventReview.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: currentUser.id
        }
      }
    });

    if (!review) {
      throw new NotFoundException("You have not reviewed this event.");
    }

    const updatedReview = await this.prisma.eventReview.update({
      where: {
        id: review.id
      },
      data: {
        rating: updateEventReviewDto.rating,
        comment: updateEventReviewDto.comment
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });

    return this.toResponse(updatedReview);
  }

  private async assertCanReviewEvent(eventId: string, currentUser: AuthenticatedUser) {
    if (currentUser.role !== UserRole.participant) {
      throw new ForbiddenException("Only participant users can review events.");
    }

    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    if (event.endsAt > new Date()) {
      throw new ForbiddenException("Participants can review an event only after it ends.");
    }

    const registration = await this.prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: currentUser.id,
          eventId
        }
      }
    });

    if (!registration || registration.status === RegistrationStatus.cancelled) {
      throw new ForbiddenException("Only registered participants can review this event.");
    }
  }

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
  }

  private toResponse(review: EventReviewWithUser) {
    return {
      id: review.id,
      eventId: review.eventId,
      userId: review.userId,
      authorName: review.user.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString()
    };
  }
}
