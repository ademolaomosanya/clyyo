import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Event, UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { PrismaService } from "../database/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const events = await this.prisma.event.findMany({
      orderBy: {
        startsAt: "asc"
      }
    });

    return events.map((event) => this.toResponse(event));
  }

  async findOne(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    return this.toResponse(event);
  }

  async create(createEventDto: CreateEventDto, currentUser: AuthenticatedUser) {
    const organizer = await this.prisma.user.findUnique({
      where: {
        id: currentUser.id
      }
    });

    if (!organizer) {
      throw new NotFoundException(`User ${currentUser.id} was not found.`);
    }

    if (organizer.role !== UserRole.organizer && organizer.role !== UserRole.admin) {
      throw new ForbiddenException("Only organizer or admin users can create events.");
    }

    const event = await this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        type: createEventDto.type,
        location: createEventDto.location,
        organizerId: currentUser.id,
        startsAt: new Date(createEventDto.startsAt),
        endsAt: new Date(createEventDto.endsAt)
      }
    });

    return this.toResponse(event);
  }

  private toResponse(event: Event) {
    return {
      id: event.id,
      organizerId: event.organizerId,
      title: event.title,
      description: event.description,
      type: event.type,
      location: event.location,
      status: event.status,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt.toISOString(),
      createdAt: event.createdAt.toISOString()
    };
  }
}
