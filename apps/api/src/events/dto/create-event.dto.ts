import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

enum CreateEventType {
  Hackathon = "hackathon",
  Conference = "conference",
  Workshop = "workshop",
  Meetup = "meetup"
}

export class CreateEventDto {
  @ApiProperty({
    example: "Clyyo Hack Lagos 2026",
    description: "Public event title."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @ApiProperty({
    example: "A weekend hackathon for builders working on event technology.",
    description: "Short event description."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description!: string;

  @ApiProperty({
    example: "hackathon",
    enum: CreateEventType,
    description: "The kind of event being hosted."
  })
  @IsEnum(CreateEventType)
  type!: CreateEventType;

  @ApiProperty({
    example: "Lagos, Nigeria",
    description: "Human-readable event location."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  location!: string;

  @ApiProperty({
    example: "2026-09-18T09:00:00.000Z",
    description: "Event start date in ISO 8601 format."
  })
  @IsDateString()
  startsAt!: string;

  @ApiProperty({
    example: "2026-09-20T18:00:00.000Z",
    description: "Event end date in ISO 8601 format."
  })
  @IsDateString()
  endsAt!: string;
}
