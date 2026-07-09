import { ApiProperty } from "@nestjs/swagger";
import { ApplicationStatus } from "@prisma/client";

export class ApplicationResponseDto {
  @ApiProperty({ example: "clx123application" })
  id!: string;

  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiProperty({ example: "clx123event" })
  eventId!: string;

  @ApiProperty({ example: "I want to build useful event tools and meet other builders." })
  motivation!: string;

  @ApiProperty({ example: ["React", "Node.js", "Product design"], isArray: true })
  skills!: string[];

  @ApiProperty({ example: ["Find teammates", "Ship an MVP"], isArray: true })
  goals!: string[];

  @ApiProperty({ example: "submitted", enum: ApplicationStatus })
  status!: ApplicationStatus;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
