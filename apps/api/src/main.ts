import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Clyyo API")
    .setDescription("Backend API for Clyyo event management platform.")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, swaggerDocument);

  await app.listen(port, "127.0.0.1");
  console.log(`Clyyo API running on http://localhost:${port}/api`);
  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
