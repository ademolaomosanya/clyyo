# Check-ins

Check-ins mark a participant as present at an event.

This builds on registrations.

```txt
registered -> checked_in
```

## Routes

```txt
POST /api/events/:eventId/check-ins
POST /api/events/:eventId/check-ins/scan
GET  /api/events/:eventId/check-ins
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## Create Check-in

`POST /api/events/:eventId/check-ins`

Request body:

```json
{
  "registrationId": "clx123registration"
}
```

## Scan QR Check-in

`POST /api/events/:eventId/check-ins/scan`

Request body:

```json
{
  "qrPayload": "clyyo:registration:clx123registration"
}
```

The API extracts the registration ID from the QR payload, then uses the same check-in business rules as the plain check-in endpoint.

## Business Rules

Only the event's organizer or an admin can check in attendees.

The registration must belong to the event.

The registration must not already be checked in.

Cancelled registrations cannot be checked in.

## Why QR Uses The Same Logic

The QR code encodes:

```txt
clyyo:registration:<registrationId>
```

Scanning the QR code calls:

```txt
POST /api/events/:eventId/check-ins/scan
```

So QR scanning is just a safer user interface around the same real check-in rules.
