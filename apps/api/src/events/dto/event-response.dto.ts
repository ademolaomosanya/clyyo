import { ApiProperty } from "@nestjs/swagger";

export class EventResponseDto {
  @ApiProperty({ example: "evt_1" })
  id!: string;

  @ApiProperty({ example: "Clyyo Hack Lagos 2026" })
  title!: string;

  @ApiProperty({ example: "A weekend hackathon for builders working on event technology." })
  description!: string;

  @ApiProperty({ example: "hackathon", enum: ["hackathon", "conference", "workshop", "meetup"] })
  type!: "hackathon" | "conference" | "workshop" | "meetup";

  @ApiProperty({ example: "Lagos, Nigeria" })
  location!: string;

  @ApiProperty({ example: "draft", enum: ["draft", "published", "cancelled"] })
  status!: "draft" | "published" | "cancelled";

  @ApiProperty({ example: "2026-09-18T09:00:00.000Z" })
  startsAt!: string;

  @ApiProperty({ example: "2026-09-20T18:00:00.000Z" })
  endsAt!: string;

  @ApiProperty({ example: "2026-07-03T12:00:00.000Z" })
  createdAt!: string;
}
