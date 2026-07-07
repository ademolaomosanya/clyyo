# DTO Validation

DTO validation makes the API reject bad request data before it reaches business logic.

For Clyyo, this matters because the frontend should not be able to create broken events.

## Packages

NestJS validation uses:

```txt
class-validator
class-transformer
```

## Global Validation Pipe

Validation is enabled in:

```txt
apps/api/src/main.ts
```

The API uses:

```ts
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
})
```

## What These Options Mean

`whitelist: true`

Removes fields that are not defined in the DTO.

`forbidNonWhitelisted: true`

Rejects requests with unknown fields instead of silently removing them.

`transform: true`

Transforms plain JSON request bodies into DTO class instances.

## CreateEventDto

The create event DTO now validates:

- `title` must be a non-empty string
- `description` must be a non-empty string
- `type` must be one of `hackathon`, `conference`, `workshop`, or `meetup`
- `location` must be a non-empty string
- `startsAt` must be an ISO date string
- `endsAt` must be an ISO date string

## Example Bad Request

```json
{
  "title": "",
  "type": "party"
}
```

The API should reject this with a `400 Bad Request`.

## Why This Comes Before Database

Validation should happen before data reaches PostgreSQL.

That keeps the service and database cleaner because bad input is stopped at the API boundary.

