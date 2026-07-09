import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "../auth/types/authenticated-user";
import { RegistrationQrResponseDto } from "./dto/registration-qr-response.dto";
import { QrCodesService } from "./qr-codes.service";

@ApiTags("QR codes")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("me/registrations/:registrationId/qr")
export class QrCodesController {
  constructor(private readonly qrCodesService: QrCodesService) {}

  @Get()
  @ApiOperation({ summary: "Get QR payload for one of the current user's registrations" })
  @ApiOkResponse({
    description: "QR payload returned successfully.",
    type: RegistrationQrResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  @ApiForbiddenResponse({ description: "You can only view QR codes for your own registrations." })
  @ApiNotFoundResponse({ description: "Registration was not found." })
  getRegistrationQr(@Param("registrationId") registrationId: string, @CurrentUser() currentUser: AuthenticatedUser) {
    return this.qrCodesService.getRegistrationQr(registrationId, currentUser);
  }
}
