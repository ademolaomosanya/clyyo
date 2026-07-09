# QR Payloads

QR support starts with a backend payload.

The backend decides what the QR means. The frontend can later render that payload as an actual QR image.

## Route

```txt
GET /api/me/registrations/:registrationId/qr
```

Requires:

```txt
Authorization: Bearer <accessToken>
```

## Response

```json
{
  "registrationId": "clx123registration",
  "eventId": "clx123event",
  "qrPayload": "clyyo:registration:clx123registration"
}
```

## Business Rule

Participants can only view QR payloads for their own registrations.

That prevents one participant from getting another participant's check-in QR.

## Why Payload First?

QR check-in has two parts:

```txt
Backend: defines the meaning of the QR code
Frontend: renders and scans the QR code
```

The first payload format is:

```txt
clyyo:registration:<registrationId>
```

The scanner parses that payload, extracts `registrationId`, and calls:

```txt
POST /api/events/:eventId/check-ins/scan
```
