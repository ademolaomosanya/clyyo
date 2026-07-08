import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class UserResponseDto {
  @ApiProperty({ example: "clx123abc0000user" })
  id!: string;

  @ApiProperty({ example: "ada@example.com" })
  email!: string;

  @ApiPropertyOptional({ example: "Ada Lovelace" })
  name!: string | null;

  @ApiProperty({ example: "participant", enum: UserRole })
  role!: UserRole;

  @ApiProperty({ example: "2026-07-07T12:00:00.000Z" })
  createdAt!: string;
}
