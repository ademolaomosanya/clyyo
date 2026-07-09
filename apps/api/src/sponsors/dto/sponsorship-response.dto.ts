import { ApiProperty } from "@nestjs/swagger";
import { SponsorshipStatus } from "@prisma/client";

export class SponsorshipResponseDto {
  @ApiProperty({ example: "clx123sponsorship" })
  id!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "clx123sponsor" })
  sponsorId!: string;

  @ApiProperty({ example: "Gold Partner" })
  packageName!: string;

  @ApiProperty({ example: "gold" })
  visibilityTier!: string;

  @ApiProperty({ example: "active", enum: SponsorshipStatus })
  status!: SponsorshipStatus;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
