# Event Reviews

Event reviews are feedback from participants after an event is done.

Event reviews are written by participants after the event.

## Routes

```txt
POST  /api/events/:eventId/reviews
GET   /api/events/:eventId/reviews
GET   /api/me/event-reviews
PATCH /api/events/:eventId/reviews/me
```

## Create Event Review

`POST /api/events/:eventId/reviews`

Requires:

```txt
Authorization: Bearer <accessToken>
```

Only participant users can submit event reviews.

The participant must be registered for the event.

The event must already be over.

Request body:

```json
{
  "rating": 5,
  "comment": "Great venue, helpful mentors, and the team matching worked well."
}
```

Rating must be between `1` and `5`.

Each participant can review the same event only once.

## List Event Reviews

`GET /api/events/:eventId/reviews`

This route is public.

Response:

```json
{
  "eventId": "clx123event",
  "totalReviews": 12,
  "averageRating": 4.58,
  "reviews": [
    {
      "id": "clx123eventreview",
      "eventId": "clx123event",
      "userId": "clx123user",
      "authorName": "Ada Builder",
      "rating": 5,
      "comment": "Great venue, helpful mentors, and the team matching worked well.",
      "createdAt": "2026-07-08T12:00:00.000Z"
    }
  ]
}
```

## My Event Reviews

`GET /api/me/event-reviews`

Requires:

```txt
Authorization: Bearer <accessToken>
```

Returns event reviews written by the current participant.

## Update My Event Review

`PATCH /api/events/:eventId/reviews/me`

Requires:

```txt
Authorization: Bearer <accessToken>
```

Request body:

```json
{
  "rating": 4,
  "comment": "Updated after thinking more about the schedule."
}
```

## Why This Matters

Event reviews help future attendees understand event quality.

Organizers can also use reviews to improve:

```txt
venue
schedule
mentor quality
team matching
check-in flow
overall experience
```
