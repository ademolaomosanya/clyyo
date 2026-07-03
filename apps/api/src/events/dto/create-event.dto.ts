import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({
    example: "Clyyo Hack Lagos 2026",
    description: "Public event title."
  })
  title!: string;

  @ApiProperty({
    example: "A weekend hackathon for builders working on event technology.",
    description: "Short event description."
  })
  description!: string;

  @ApiProperty({
    example: "hackathon",
    enum: ["hackathon", "conference", "workshop", "meetup"],
    description: "The kind of event being hosted."
  })
  type!: "hackathon" | "conference" | "workshop" | "meetup";

  @ApiProperty({
    example: "Lagos, Nigeria",
    description: "Human-readable event location."
  })
  location!: string;

  @ApiProperty({
    example: "2026-09-18T09:00:00.000Z",
    description: "Event start date in ISO 8601 format."
  })
  startsAt!: string;

  @ApiProperty({
    example: "2026-09-20T18:00:00.000Z",
    description: "Event end date in ISO 8601 format."
  })
  endsAt!: string;
}
