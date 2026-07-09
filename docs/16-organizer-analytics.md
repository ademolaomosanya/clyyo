# Organizer Analytics

Analytics summarize what is happening inside an event.

Unlike registrations or check-ins, this feature does not create a new database record. It reads existing data and calculates useful numbers for organizers.

## Route

```txt
GET /api/events/:eventId/analytics
```

Requires:

```txt
Authorization: Bearer <accessToken>
```

Only the event's organizer or an admin can view analytics.

## Response

```json
{
  "eventId": "clx123event",
  "totalApplications": 24,
  "submittedApplications": 12,
  "acceptedApplications": 8,
  "rejectedApplications": 3,
  "waitlistedApplications": 1,
  "totalRegistrations": 16,
  "activeRegistrations": 15,
  "cancelledRegistrations": 1,
  "checkedInCount": 10,
  "checkInRate": 66.67,
  "teamCount": 4,
  "participantsInTeams": 14,
  "unassignedParticipants": 1
}
```

## What Each Number Means

`totalApplications` counts every application submitted for the event.

`acceptedApplications`, `rejectedApplications`, and `waitlistedApplications` show organizer review progress.

`activeRegistrations` counts registrations that are not cancelled.

`checkedInCount` counts registrations with `checked_in` status.

`checkInRate` is:

```txt
checkedInCount / activeRegistrations * 100
```

`unassignedParticipants` is:

```txt
activeRegistrations - participantsInTeams
```

## Why This Matters

This gives organizers a dashboard-ready summary:

```txt
How many people applied?
How many registered?
How many arrived?
How many teams exist?
Who still needs a team?
```

Later, the frontend can call this endpoint to show organizer dashboard cards and charts.
