import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "List users" })
  @ApiOkResponse({
    description: "Users returned successfully.",
    type: UserResponseDto,
    isArray: true
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":userId")
  @ApiOperation({ summary: "Get one user by ID" })
  @ApiOkResponse({
    description: "User returned successfully.",
    type: UserResponseDto
  })
  @ApiNotFoundResponse({ description: "User was not found." })
  findOne(@Param("userId") userId: string) {
    return this.usersService.findOne(userId);
  }

  @Post()
  @ApiOperation({ summary: "Create a user" })
  @ApiCreatedResponse({
    description: "User created successfully.",
    type: UserResponseDto
  })
  @ApiConflictResponse({ description: "A user with this email already exists." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
