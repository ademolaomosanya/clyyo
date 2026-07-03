# Clyyo Codebase Map

Clyyo is an event management platform for hackathons and conferences. The main features are event registration, team matching, QR check-in, certificates, AI-assisted review, and organizer analytics.

This repo is shaped as a monorepo. That means one repository contains multiple apps and shared packages.

## Big Picture

```txt
clyyo/
  apps/
    web/        Next.js frontend used by visitors, attendees, organizers, sponsors, and admins
    api/        NestJS backend API used by the frontend and external services
    worker/     NestJS background worker for slow or retryable jobs
  packages/
    database/   Shared database schema, migrations, and database client
    types/      Shared TypeScript types
    validation/ Shared validation schemas
    ui/         Shared frontend UI components
  infrastructure/
    docker/         Local and production Docker files
    github-actions/ CI/CD workflow notes or reusable config
```

## How A Request Moves Through The System

Example: an attendee applies to a hackathon.

```txt
User clicks Apply
  -> apps/web sends request
  -> apps/api validates the request
  -> apps/api writes application to PostgreSQL
  -> apps/api adds email and AI review jobs to Redis
  -> apps/worker processes those jobs later
  -> organizer sees review results in dashboard
```

The API gives fast responses. The worker handles slow work.

## apps/web

This is the Next.js frontend. It is what people see in the browser.

It should contain:

- Landing pages
- Event browsing pages
- Event details pages
- Login and account screens
- Attendee dashboard
- Organizer dashboard
- Sponsor dashboard
- Admin dashboard
- Registration and application forms
- QR check-in screens
- Analytics screens

It should not contain:

- Secret API keys
- Direct database access
- Payment secrets
- Background job processing
- AI service secrets

The frontend talks to `apps/api`.

## apps/api

This is the NestJS backend API. It owns the main business rules.

It should contain:

- Authentication support
- Authorization and role checks
- Event APIs
- Registration APIs
- Application review APIs
- Team APIs
- QR check-in APIs
- Certificate APIs
- Analytics read APIs
- Sponsor APIs
- Admin APIs
- Payment webhook endpoints
- File upload endpoints
- Job enqueueing

The API decides whether a user is allowed to do something.

Examples:

- Can this organizer edit this event?
- Can this attendee join this team?
- Is this QR code valid for this event?
- Can this sponsor see these leads?

The API should avoid long-running work. Instead, it should create a job for the worker.

## apps/worker

This is the background worker. It processes jobs from a queue.

It should contain:

- Email sending jobs
- Notification jobs
- QR code generation jobs
- Certificate generation jobs
- PDF generation jobs
- Image compression jobs
- AI application review jobs
- AI team matching jobs
- Attendance prediction jobs
- Analytics aggregation jobs
- Scheduled reminder jobs

The worker is for work that can happen after the user gets a response.

Example:

```txt
API: "Your application was submitted"
Worker: sends confirmation email and runs AI review in the background
```

## packages/database

This package should hold the database layer.

Likely contents:

- Prisma schema
- Prisma migrations
- Shared Prisma client
- Seed scripts

PostgreSQL should be the source of truth for important data:

- Users
- Organizations
- Events
- Applications
- Registrations
- Teams
- Sponsors
- Sessions
- Check-ins
- Certificates
- Payments
- Audit logs

## packages/types

This package should hold TypeScript types shared across apps.

Examples:

- `UserRole`
- `EventStatus`
- `ApplicationStatus`
- `RegistrationStatus`
- `CheckInStatus`
- Shared API response types

## packages/validation

This package should hold validation schemas shared by the frontend and API.

Use this for forms and API input validation.

Examples:

- Create event schema
- Register for event schema
- Submit application schema
- Create team schema
- Sponsor inquiry schema

## packages/ui

This package should hold shared React UI components for the frontend.

Examples:

- Button
- Input
- Modal
- Badge
- Card
- Data table
- Dashboard shell

This package should be used by `apps/web`, not by the API or worker.

## infrastructure

This folder is for deployment and local development support.

Possible contents:

- Docker Compose for PostgreSQL and Redis
- API Dockerfile
- Worker Dockerfile
- Web Dockerfile
- GitHub Actions deployment workflows

## First Build Order

Build Clyyo in this order:

1. Monorepo setup
2. Next.js app in `apps/web`
3. NestJS API in `apps/api`
4. PostgreSQL and Prisma in `packages/database`
5. First API module: health check
6. Auth and users
7. Events
8. Registrations and applications
9. Redis queue
10. NestJS worker in `apps/worker`
11. Emails
12. QR check-in
13. Teams
14. Certificates
15. Analytics
16. AI features

This order keeps the project understandable. Each new piece has a clear reason to exist.

