import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventResponseDto } from "./dto/event-response.dto";

@Injectable()
export class EventsService {
  private events: EventResponseDto[] = [
    {
      id: "evt_1",
      title: "Clyyo Hack Lagos 2026",
      description: "A weekend hackathon for builders working on event technology.",
      type: "hackathon",
      location: "Lagos, Nigeria",
      status: "published",
      startsAt: "2026-09-18T09:00:00.000Z",
      endsAt: "2026-09-20T18:00:00.000Z",
      createdAt: "2026-07-03T12:00:00.000Z"
    }
  ];

  findAll() {
    return this.events;
  }

  findOne(eventId: string) {
    const event = this.events.find((item) => item.id === eventId);

    if (!event) {
      throw new NotFoundException(`Event ${eventId} was not found.`);
    }

    return event;
  }

  create(createEventDto: CreateEventDto) {
    const now = new Date().toISOString();
    const event: EventResponseDto = {
      id: `evt_${this.events.length + 1}`,
      ...createEventDto,
      status: "draft",
      createdAt: now
    };

    this.events.push(event);
    return event;
  }
}
