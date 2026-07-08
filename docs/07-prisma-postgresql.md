# Prisma And PostgreSQL

Clyyo now has the first database layer.

Before this step, events were stored in memory inside `EventsService`.

That was useful for learning controllers and services, but it was temporary. If the server restarted, new events disappeared.

Now events are designed to live in PostgreSQL through Prisma.

## Important Files

```txt
packages/database/prisma/schema.prisma
apps/api/src/database/database.module.ts
apps/api/src/database/prisma.service.ts
apps/api/src/events/events.service.ts
infrastructure/docker/docker-compose.yml
.env.example
```

## Prisma Schema

The Prisma schema defines database tables.

The first model is:

```txt
Event
```

It maps to the PostgreSQL table:

```txt
events
```

## Local PostgreSQL

The local database is defined in:

```txt
infrastructure/docker/docker-compose.yml
```

Start it with:

```bash
pnpm db:up
```

Or run Docker Compose directly from the repo root:

```bash
docker compose --env-file .env -f infrastructure/docker/docker-compose.yml up -d
```

## Environment Variables

Create a local `.env` file from `.env.example`.

The local database URL is:

```txt
postgresql://clyyo:<your-local-password>@localhost:5432/clyyo?schema=public
```

## Prisma Commands

Generate Prisma Client:

```bash
pnpm --filter @clyyo/database db:generate
```

Run a migration:

```bash
pnpm db:migrate
```

Open Prisma Studio:

```bash
pnpm --filter @clyyo/database db:studio
```

## API Flow

The events API now follows this flow:

```txt
EventsController
  -> EventsService
  -> PrismaService
  -> PostgreSQL
```

## Prisma 7 Adapter

Prisma 7 uses a driver adapter for direct PostgreSQL connections.

In the API, this is configured in:

```txt
apps/api/src/database/prisma.service.ts
```

The API creates Prisma like this:

```ts
new PrismaClient({
  adapter: new PrismaPg(databaseUrl)
})
```

That is why `DATABASE_URL` must exist before the API starts.

This is the real backend shape we will keep using for users, organizations, registrations, teams, and check-ins.
