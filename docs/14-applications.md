# Applications

Applications capture why a participant wants to join an event, what skills they have, and what goals they bring.

This is useful for hackathons because organizers can review people before forming teams.

## Routes

```txt
POST  /api/events/:eventId/applications
GET   /api/events/:eventId/applications
GET   /api/me/applications
PATCH /api/events/:eventId/applications/:applicationId/status
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## Submit Application

`POST /api/events/:eventId/applications`

Only participants can submit applications.

Request body:

```json
{
  "motivation": "I want to build useful event tools and meet other builders.",
  "skills": ["React", "Node.js", "Product design"],
  "goals": ["Find teammates", "Ship an MVP", "Learn AI workflows"]
}
```

Each participant can submit only one application per event.

## Review Applications

`GET /api/events/:eventId/applications`

Only the event's organizer or an admin can view all applications for an event.

## Update Application Status

`PATCH /api/events/:eventId/applications/:applicationId/status`

Only the event's organizer or an admin can review applications.

Request body:

```json
{
  "status": "accepted"
}
```

Valid statuses:

```txt
submitted
accepted
rejected
waitlisted
```

## Why Applications Matter

Registrations answer:

```txt
Who is attending?
```

Applications answer:

```txt
What can this person build, and how should we match them?
```

That becomes the foundation for team matching.
