import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

const rootEnvPath = "../../.env";

if (!process.env.DATABASE_URL && existsSync(rootEnvPath)) {
  process.loadEnvFile(rootEnvPath);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL
  },
  migrations: {
    path: "prisma/migrations"
  }
});
