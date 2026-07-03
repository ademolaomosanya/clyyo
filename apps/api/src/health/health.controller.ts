import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Check whether the API is running" })
  @ApiOkResponse({
    description: "The API is healthy.",
    schema: {
      example: {
        status: "ok",
        service: "clyyo-api"
      }
    }
  })
  getHealth() {
    return {
      status: "ok",
      service: "clyyo-api"
    };
  }
}
