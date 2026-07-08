# Event Organizers

Events now connect to users.

This is the first ownership rule in Clyyo.

## Relationship

```txt
User
  -> can organize many events

Event
  -> can belong to one organizer
```

In Prisma:

```txt
User.organizedEvents
Event.organizerId
Event.organizer
```

## Business Rule

Only users with one of these roles can create events:

```txt
organizer
admin
```

Users with these roles cannot create events:

```txt
participant
sponsor
```

## Current API Flow

`POST /api/events` now uses the authenticated user from the Bearer token.

Example:

```json
{
  "title": "Clyyo Hack Lagos 2026",
  "description": "A weekend hackathon for builders working on event technology.",
  "type": "hackathon",
  "location": "Lagos, Nigeria",
  "startsAt": "2026-09-18T09:00:00.000Z",
  "endsAt": "2026-09-20T18:00:00.000Z"
}
```

The service checks:

1. Is the Bearer token valid?
2. Does this authenticated user exist?
3. Is the user role `organizer` or `admin`?
3. If yes, create the event.

The frontend should not send `organizerId` when creating events.
