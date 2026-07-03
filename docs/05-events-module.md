# Events Module

The events module is the first real Clyyo backend feature.

It introduces the basic NestJS pattern:

```txt
Module -> Controller -> Service -> DTO
```

## Files

```txt
apps/api/src/events/
  events.module.ts
  events.controller.ts
  events.service.ts
  dto/
    create-event.dto.ts
    event-response.dto.ts
```

## Routes

Because the API has a global `/api` prefix, these controller routes become:

```txt
GET    /api/events
GET    /api/events/:eventId
POST   /api/events
```

## Controller

The controller defines HTTP routes.

In Clyyo, `EventsController` answers questions like:

- What route lists events?
- What route returns one event?
- What route creates an event?

The controller should stay thin. It receives HTTP input and calls the service.

## Service

The service owns the business logic.

Right now `EventsService` stores fake in-memory events.

This is temporary. Later, this service will use Prisma and PostgreSQL.

## DTOs

DTO means Data Transfer Object.

DTOs describe the shape of data moving in or out of the API.

`CreateEventDto` describes the body for:

```txt
POST /api/events
```

`EventResponseDto` describes the event object returned by the API.

## Why In-Memory First?

We are using fake in-memory data first so the NestJS pattern is easy to understand.

The learning order is:

1. Understand controller, service, module, and DTO
2. See the routes in Swagger
3. Add validation
4. Add database with Prisma

This keeps each new concept small.

