import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCheckInDto {
  @ApiProperty({
    example: "clx123registration",
    description: "Registration ID encoded in the attendee's QR code."
  })
  @IsString()
  @IsNotEmpty()
  registrationId!: string;
}
