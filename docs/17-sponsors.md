# Sponsors

Sponsors support events and need controlled access to event visibility, leads, and sponsor-facing analytics.

The backend uses a `Sponsorship` record to connect a sponsor user to an event.

## Routes

```txt
POST /api/events/:eventId/sponsorships
GET  /api/events/:eventId/sponsorships
GET  /api/me/sponsored-events
GET  /api/events/:eventId/sponsor-leads
GET  /api/events/:eventId/sponsor-analytics
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## Attach Sponsor To Event

`POST /api/events/:eventId/sponsorships`

Only the event's organizer or an admin can attach a sponsor.

Request body:

```json
{
  "sponsorId": "clx123sponsor",
  "packageName": "Gold Partner",
  "visibilityTier": "gold"
}
```

The `sponsorId` must belong to a user with role `sponsor`.

Each sponsor can only be attached once to the same event.

## View Sponsored Events

`GET /api/me/sponsored-events`

Only sponsor users can call this route.

It returns events where the current sponsor has an active sponsorship.

## View Sponsor Leads

`GET /api/events/:eventId/sponsor-leads`

Allowed users:

```txt
active sponsor for the event
event organizer
admin
```

Leads are active event registrations enriched with application skills and goals when available.

## Sponsor Analytics

`GET /api/events/:eventId/sponsor-analytics`

Returns sponsor-friendly metrics:

```json
{
  "eventId": "clx123event",
  "sponsorCount": 3,
  "leadCount": 24,
  "applicationCount": 18,
  "activeRegistrations": 16,
  "checkedInCount": 10,
  "checkInRate": 62.5,
  "teamCount": 4
}
```

## Why Sponsorships Matter

A user having role `sponsor` is not enough.

The platform also needs to know:

```txt
Which event does this sponsor support?
What package did they buy?
What visibility tier should the frontend show?
Are they active right now?
```

That is what the `Sponsorship` model stores.
