import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { SponsorsController } from "./sponsors.controller";
import { SponsorsService } from "./sponsors.service";

@Module({
  imports: [AuthModule, DatabaseModule, NotificationsModule],
  controllers: [SponsorsController],
  providers: [SponsorsService]
})
export class SponsorsModule {}
