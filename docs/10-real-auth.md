# Real Auth Foundation

Clyyo now has real API authentication.

This is not mock auth. Users register with a password, the API hashes the password, and login returns a JWT access token.

## Auth Routes

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Register

`POST /api/auth/register`

Example body:

```json
{
  "email": "ada@example.com",
  "name": "Ada Lovelace",
  "password": "correct-horse-battery-staple",
  "role": "organizer"
}
```

Passwords are hashed before they are stored.

Public registration can create:

```txt
participant
organizer
sponsor
```

Admin users should be created manually later by a platform admin flow.

## Login

`POST /api/auth/login`

Example body:

```json
{
  "email": "ada@example.com",
  "password": "correct-horse-battery-staple"
}
```

The response includes:

```txt
accessToken
tokenType
user
```

## Using The Token

Protected routes use this header:

```txt
Authorization: Bearer <accessToken>
```

## Current User

`GET /api/auth/me`

Returns the user attached to the Bearer token.

## Event Creation

`POST /api/events` is now protected.

Only these roles can create events:

```txt
organizer
admin
```

The API no longer trusts `organizerId` from the request body. It uses the authenticated user from the JWT.

This is the important security shift:

```txt
Before: frontend tells API who the organizer is
Now: API reads organizer from the verified access token
```

