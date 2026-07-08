import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

const PUBLIC_REGISTRATION_ROLES = [UserRole.participant, UserRole.organizer, UserRole.sponsor] as const;
type PublicRegistrationRole = (typeof PUBLIC_REGISTRATION_ROLES)[number];

export class RegisterDto {
  @ApiProperty({ example: "ada@example.com" })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: "Ada Lovelace" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string;

  @ApiProperty({ example: "correct-horse-battery-staple", minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({
    example: "participant",
    enum: [UserRole.participant, UserRole.organizer, UserRole.sponsor],
    description: "Admin users should be created manually, not through public registration."
  })
  @IsOptional()
  @IsIn(PUBLIC_REGISTRATION_ROLES)
  role?: PublicRegistrationRole;
}
