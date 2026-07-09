import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { EventReviewsController } from "./event-reviews.controller";
import { EventReviewsService } from "./event-reviews.service";

@Module({
  imports: [AuthModule, DatabaseModule, NotificationsModule],
  controllers: [EventReviewsController],
  providers: [EventReviewsService]
})
export class EventReviewsModule {}
