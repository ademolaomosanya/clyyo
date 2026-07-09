import { ApiProperty } from "@nestjs/swagger";
import { EventStatus, EventType, SponsorshipStatus } from "@prisma/client";

export class SponsoredEventResponseDto {
  @ApiProperty({ example: "clx123sponsorship" })
  sponsorshipId!: string;

  @ApiProperty({ example: "Gold Partner" })
  packageName!: string;

  @ApiProperty({ example: "gold" })
  visibilityTier!: string;

  @ApiProperty({ example: "active", enum: SponsorshipStatus })
  sponsorshipStatus!: SponsorshipStatus;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "Clyyo Hack Lagos 2026" })
  title!: string;

  @ApiProperty({ example: "hackathon", enum: EventType })
  type!: EventType;

  @ApiProperty({ example: "published", enum: EventStatus })
  status!: EventStatus;

  @ApiProperty({ example: "Lagos, Nigeria" })
  location!: string;

  @ApiProperty({ example: "2026-09-18T09:00:00.000Z" })
  startsAt!: string;

  @ApiProperty({ example: "2026-09-20T18:00:00.000Z" })
  endsAt!: string;
}
