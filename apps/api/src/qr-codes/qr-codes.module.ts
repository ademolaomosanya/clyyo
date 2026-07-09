import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { QrCodesController } from "./qr-codes.controller";
import { QrCodesService } from "./qr-codes.service";

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [QrCodesController],
  providers: [QrCodesService]
})
export class QrCodesModule {}
