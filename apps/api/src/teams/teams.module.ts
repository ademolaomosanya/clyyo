import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";

@Module({
  imports: [AuthModule, DatabaseModule, NotificationsModule],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
