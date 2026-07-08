import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "ada@example.com",
    description: "Unique email address for the user."
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: "Ada Lovelace",
    description: "Display name for the user."
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    example: "participant",
    enum: UserRole,
    description: "Role that controls what the user can do in Clyyo."
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
