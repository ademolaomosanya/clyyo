import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

class AuthUserDto {
  @ApiProperty({ example: "clx123abc0000user" })
  id!: string;

  @ApiProperty({ example: "ada@example.com" })
  email!: string;

  @ApiPropertyOptional({ example: "Ada Lovelace" })
  name!: string | null;

  @ApiProperty({ example: "participant", enum: UserRole })
  role!: UserRole;
}

export class AuthResponseDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  accessToken!: string;

  @ApiProperty({ example: "Bearer" })
  tokenType!: "Bearer";

  @ApiProperty({ type: AuthUserDto })
  user!: AuthUserDto;
}
