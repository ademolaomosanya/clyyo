import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NotificationType } from "@prisma/client";

export class NotificationResponseDto {
  @ApiProperty({ example: "clx123notification" })
  id!: string;

  @ApiProperty({ example: "clx123user" })
  userId!: string;

  @ApiProperty({ example: "registration_created", enum: NotificationType })
  type!: NotificationType;

  @ApiProperty({ example: "Registration confirmed" })
  title!: string;

  @ApiProperty({ example: "You are registered for Clyyo Hack Lagos 2026." })
  body!: string;

  @ApiPropertyOptional({
    example: {
      eventId: "clx123event"
    }
  })
  metadata!: unknown;

  @ApiPropertyOptional({ example: "2026-07-08T12:00:00.000Z" })
  readAt!: string | null;

  @ApiProperty({ example: "2026-07-08T12:00:00.000Z" })
  createdAt!: string;
}
