import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSponsorshipDto {
  @ApiProperty({
    example: "clx123sponsor",
    description: "User ID for the sponsor account."
  })
  @IsString()
  @IsNotEmpty()
  sponsorId!: string;

  @ApiProperty({
    example: "Gold Partner",
    description: "Commercial package name for the sponsorship."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  packageName!: string;

  @ApiProperty({
    example: "gold",
    description: "Visibility level used by the frontend for sponsor placement."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  visibilityTier!: string;
}
