import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { HealthModule } from "./health/health.module";
import { RegistrationsModule } from "./registrations/registrations.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"]
    }),
    HealthModule,
    AuthModule,
    EventsModule,
    RegistrationsModule,
    UsersModule
  ]
})
export class AppModule {}
