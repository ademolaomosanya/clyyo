import { ApiProperty } from "@nestjs/swagger";

export class RegistrationQrResponseDto {
  @ApiProperty({ example: "clx123registration" })
  registrationId!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({
    example: "clyyo:registration:clx123registration",
    description: "Stable payload that the frontend can render as a QR code."
  })
  qrPayload!: string;
}
