import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class ScanCheckInDto {
  @ApiProperty({
    example: "clyyo:registration:clx123registration",
    description: "Payload read from the attendee's QR code."
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^clyyo:registration:[A-Za-z0-9_-]+$/, {
    message: "qrPayload must use clyyo:registration:<registrationId> format."
  })
  qrPayload!: string;
}
