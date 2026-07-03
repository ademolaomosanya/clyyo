# Swagger API Docs

Clyyo uses Swagger so we can see and test backend endpoints in the browser.

This is useful because we are building backend first.

## URL

When the API is running, open:

```txt
http://localhost:4000/api/docs
```

The first documented endpoint is:

```txt
GET /api/health
```

It returns:

```json
{
  "status": "ok",
  "service": "clyyo-api"
}
```

## Files

Swagger is configured in:

```txt
apps/api/src/main.ts
```

The health endpoint is documented in:

```txt
apps/api/src/health/health.controller.ts
```

## Why Swagger Matters

Swagger becomes the API contract between the backend and frontend.

Before we build a Next.js screen, we can use Swagger to answer:

- What endpoint should the frontend call?
- What input does the endpoint need?
- What response should the frontend expect?
- Does the endpoint require authentication?

As we add users, auth, events, registrations, and check-in, each endpoint should appear in Swagger.

