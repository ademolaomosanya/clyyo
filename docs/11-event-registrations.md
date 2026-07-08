# Event Registrations

Registrations are how participants join events.

This is different from creating an event.

```txt
POST /api/events
  -> organizer/admin creates an event

POST /api/events/:eventId/register
  -> participant registers for an existing event
```

## Database Model

The database now has:

```txt
Registration
RegistrationStatus
```

Registration statuses:

```txt
registered
checked_in
cancelled
```

## Business Rules

Only `participant` users can register for events.

A participant cannot register for the same event twice.

Only the event's organizer or an admin can view registrations for that event.

Any authenticated user can view their own registrations.

## Routes

```txt
POST /api/events/:eventId/register
GET  /api/events/:eventId/registrations
GET  /api/me/registrations
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## What Comes Next

Registrations prepare Clyyo for QR check-in.

The next step is:

```txt
QR check-in
```

That will turn a registration from:

```txt
registered
```

to:

```txt
checked_in
```

