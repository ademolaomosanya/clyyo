import { Injectable, NotFoundException } from "@nestjs/common";
import { Event } from "@prisma/client";
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

  async create(createEventDto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        type: createEventDto.type,
        location: createEventDto.location,
        startsAt: new Date(createEventDto.startsAt),
        endsAt: new Date(createEventDto.endsAt)
      }
    });

    return this.toResponse(event);
  }

  private toResponse(event: Event) {
    return {
      id: event.id,
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
