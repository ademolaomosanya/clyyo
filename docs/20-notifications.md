# Notifications

Notifications are messages stored for a user when something important happens in the app.

For now, notifications live in PostgreSQL.

Later, the worker can read notification events and send email, push, or Slack messages.

## Routes

```txt
GET   /api/me/notifications
PATCH /api/me/notifications/:notificationId/read
PATCH /api/me/notifications/:notificationId/unread
```

All routes require:

```txt
Authorization: Bearer <accessToken>
```

## List My Notifications

`GET /api/me/notifications`

Response:

```json
[
  {
    "id": "clx123notification",
    "userId": "clx123user",
    "type": "registration_created",
    "title": "Registration confirmed",
    "body": "You are registered for Clyyo Hack Lagos 2026.",
    "metadata": {
      "eventId": "clx123event"
    },
    "readAt": null,
    "createdAt": "2026-07-08T12:00:00.000Z"
  }
]
```

## Mark As Read

`PATCH /api/me/notifications/:notificationId/read`

Sets `readAt` to the current time.

Only the notification owner can update it.

## Mark As Unread

`PATCH /api/me/notifications/:notificationId/unread`

Sets `readAt` back to `null`.

Only the notification owner can update it.

## Notification Types

The first notification types are:

```txt
registration_created
application_status_changed
check_in_completed
team_member_added
sponsorship_created
event_review_submitted
```

## Current Notification Hooks

Notifications are created when:

```txt
participant registers for an event
organizer changes an application status
participant is checked in
participant is added to a team
sponsor is attached to an event
participant submits an event review
```

## Why This Comes Before Email

A notification table is the source of truth.

Email is only one delivery channel.

That means the app can show notifications in the dashboard first, then the worker can send emails later without changing the main business logic.
