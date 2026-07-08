import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsService } from "./registrations.service";

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService]
})
export class RegistrationsModule {}
