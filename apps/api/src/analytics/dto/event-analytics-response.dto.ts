import { ApiProperty } from "@nestjs/swagger";

export class EventAnalyticsResponseDto {
  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: 24 })
  totalApplications!: number;

  @ApiProperty({ example: 12 })
  submittedApplications!: number;

  @ApiProperty({ example: 8 })
  acceptedApplications!: number;

  @ApiProperty({ example: 3 })
  rejectedApplications!: number;

  @ApiProperty({ example: 1 })
  waitlistedApplications!: number;

  @ApiProperty({ example: 16 })
  totalRegistrations!: number;

  @ApiProperty({ example: 15 })
  activeRegistrations!: number;

  @ApiProperty({ example: 1 })
  cancelledRegistrations!: number;

  @ApiProperty({ example: 10 })
  checkedInCount!: number;

  @ApiProperty({ example: 66.67 })
  checkInRate!: number;

  @ApiProperty({ example: 4 })
  teamCount!: number;

  @ApiProperty({ example: 14 })
  participantsInTeams!: number;

  @ApiProperty({ example: 1 })
  unassignedParticipants!: number;
}
