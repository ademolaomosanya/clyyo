# Team Formation

Teams group registered participants inside an event.

For Clyyo, this is the backend foundation for hackathon team matching.

## Routes

```txt
POST /api/events/:eventId/teams
GET  /api/events/:eventId/teams
POST /api/events/:eventId/teams/:teamId/members
GET  /api/me/teams
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## Create Team

`POST /api/events/:eventId/teams`

Only the event's organizer or an admin can create teams.

Request body:

```json
{
  "name": "Team Atlas",
  "description": "Builders focused on QR check-in and event analytics.",
  "maxSize": 4
}
```

Team names must be unique inside one event.

## List Teams

`GET /api/events/:eventId/teams`

Allowed users:

```txt
event organizer
admin
registered participant for that event
```

## Add Team Member

`POST /api/events/:eventId/teams/:teamId/members`

Only the event's organizer or an admin can add members.

Request body:

```json
{
  "userId": "clx123user",
  "role": "member"
}
```

The participant must be registered for the event.

A participant can only be on one team per event.

A team cannot exceed `maxSize`.

## Team Roles

```txt
lead
member
```

## Why This Comes After Applications

Applications collect participant skills and goals.

Teams use those signals to decide:

```txt
Who should work together?
Who has complementary skills?
Which teams are full?
```

Later, AI matching can recommend teams using the application data.
