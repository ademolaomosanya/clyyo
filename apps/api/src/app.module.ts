import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AnalyticsModule } from "./analytics/analytics.module";
import { ApplicationsModule } from "./applications/applications.module";
import { AuthModule } from "./auth/auth.module";
import { CheckInsModule } from "./check-ins/check-ins.module";
import { EventReviewsModule } from "./event-reviews/event-reviews.module";
import { EventsModule } from "./events/events.module";
import { HealthModule } from "./health/health.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { QrCodesModule } from "./qr-codes/qr-codes.module";
import { RegistrationsModule } from "./registrations/registrations.module";
import { SponsorsModule } from "./sponsors/sponsors.module";
import { TeamsModule } from "./teams/teams.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"]
    }),
    AnalyticsModule,
    ApplicationsModule,
    HealthModule,
    AuthModule,
    CheckInsModule,
    EventReviewsModule,
    EventsModule,
    QrCodesModule,
    NotificationsModule,
    RegistrationsModule,
    SponsorsModule,
    TeamsModule,
    UsersModule
  ]
})
export class AppModule {}
