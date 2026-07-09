import { ApiProperty } from "@nestjs/swagger";

export class SponsorAnalyticsResponseDto {
  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: 3 })
  sponsorCount!: number;

  @ApiProperty({ example: 24 })
  leadCount!: number;

  @ApiProperty({ example: 18 })
  applicationCount!: number;

  @ApiProperty({ example: 16 })
  activeRegistrations!: number;

  @ApiProperty({ example: 10 })
  checkedInCount!: number;

  @ApiProperty({ example: 62.5 })
  checkInRate!: number;

  @ApiProperty({ example: 4 })
  teamCount!: number;
}
