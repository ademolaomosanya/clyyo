# Users And Roles

Users are the identity foundation for Clyyo.

Before we add login, auth guards, event ownership, applications, or check-in permissions, the backend needs a basic user model.

## Roles

Clyyo starts with four roles:

```txt
organizer
sponsor
participant
admin
```

## What Each Role Means

`participant`

Registers for events, joins teams, checks in, and participates.

`organizer`

Creates and manages events, reviews applications, manages teams, and views event analytics.

`sponsor`

Views sponsored events, leads, visibility, and sponsor analytics.

`admin`

Manages the whole Clyyo platform.

## Database Model

The Prisma schema now has:

```txt
User
UserRole
```

The `User` model stores:

- `id`
- `email`
- `name`
- `role`
- `createdAt`
- `updatedAt`

## API Files

```txt
apps/api/src/users/
  users.module.ts
  users.controller.ts
  users.service.ts
  dto/
    create-user.dto.ts
    user-response.dto.ts
```

## Routes

```txt
GET    /api/users
GET    /api/users/:userId
POST   /api/users
```

These routes are not authentication yet. They are the user data foundation.

## What Comes Next

After users, the next step is auth and guards:

```txt
AuthGuard  -> is this request from a logged-in user?
RolesGuard -> does this user have the right role?
```

Then we can connect events to organizers.

