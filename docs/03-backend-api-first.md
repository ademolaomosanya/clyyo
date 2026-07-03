# Backend First: NestJS API

We are building the backend before the Next.js frontend.

This gives Clyyo a clear API contract before we build screens.

## Why Backend First?

The backend owns the important rules:

- Who can create events
- Who can register for events
- Who can review applications
- Who can check in attendees
- Who can view analytics
- When background jobs should be created

The frontend should not decide these rules by itself. The frontend asks the API, and the API decides.

## First API Files

```txt
apps/api/
  src/
    main.ts
    app.module.ts
    health/
      health.controller.ts
      health.module.ts
```

## main.ts

`main.ts` starts the NestJS server.

It also:

- Uses port `4000` by default
- Adds the `/api` prefix
- Allows the future Next.js app at `http://localhost:3000` to call the API

The health endpoint will be:

```txt
GET http://localhost:4000/api/health
```

## app.module.ts

`AppModule` is the root NestJS module.

For now, it imports:

- `ConfigModule` for environment variables
- `HealthModule` for the first test endpoint

## health.controller.ts

The health controller answers:

```json
{
  "status": "ok",
  "service": "clyyo-api"
}
```

This endpoint proves the backend can start before we add real Clyyo features.

## What Comes Next?

After this, we should add backend modules in this order:

1. `users`
2. `auth`
3. `organizations`
4. `events`
5. `registrations`
6. `applications`
7. `teams`
8. `check-in`
9. `analytics`
10. `queues`

