import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { AuthenticatedUser } from "./types/authenticated-user";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiCreatedResponse({
    description: "User registered successfully.",
    type: AuthResponseDto
  })
  @ApiConflictResponse({ description: "A user with this email already exists." })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Log in with email and password" })
  @ApiOkResponse({
    description: "Login successful.",
    type: AuthResponseDto
  })
  @ApiUnauthorizedResponse({ description: "Invalid email or password." })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the current authenticated user" })
  @ApiOkResponse({ description: "Current user returned successfully." })
  @ApiUnauthorizedResponse({ description: "Bearer token is missing or invalid." })
  me(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
