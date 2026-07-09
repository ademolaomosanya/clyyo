# clyyo
Hi i'm building Clyyo, an event management platform with  team matching, QR check-in, and organizer analytics basically for hackathon and conferences. 

## Learning path

- [Codebase map](docs/01-codebase-map.md): explains what each folder is for and how the system fits together.
- [PNPM workspace setup](docs/02-pnpm-workspace.md): explains the monorepo package manager setup.
- [Backend first: NestJS API](docs/03-backend-api-first.md): explains the first API files and health endpoint.
- [Swagger API docs](docs/04-swagger-api-docs.md): explains the browser API documentation page.
- [Events module](docs/05-events-module.md): explains the first real backend feature.
- [DTO validation](docs/06-dto-validation.md): explains how incoming request data is checked.
- [Prisma and PostgreSQL](docs/07-prisma-postgresql.md): explains the first database layer.
- [Users and roles](docs/08-users-and-roles.md): explains the user model and Clyyo roles.
- [Event organizers](docs/09-event-organizers.md): explains event ownership and organizer rules.
- [Real auth foundation](docs/10-real-auth.md): explains register, login, JWTs, and protected routes.
- [Event registrations](docs/11-event-registrations.md): explains participant event registration.
- [Check-ins](docs/12-check-ins.md): explains attendee check-in for registered participants.
- [QR payloads](docs/13-qr-payloads.md): explains backend QR payloads for registrations.
- [Applications](docs/14-applications.md): explains participant applications and organizer review.
- [Team formation](docs/15-team-formation.md): explains event teams and team members.
- [Organizer analytics](docs/16-organizer-analytics.md): explains event metrics for organizer dashboards.
- [Sponsors](docs/17-sponsors.md): explains sponsored events, leads, visibility, and sponsor analytics.
- [Event reviews](docs/19-event-reviews.md): explains participant feedback after completed events.
- [Notifications](docs/20-notifications.md): explains user notifications and read/unread state.

The following diagram shows Clyyo's System Design(subject to change and get improved as i build):
#
<img width="1245" height="1240" alt="diagram-export-30-06-2026-14_22_37" src="https://github.com/user-attachments/assets/eaddcfdc-2599-4400-be0d-65e496dedc63" />
<img width="1571" height="1001" alt="ChatGPT Image Jun 30, 2026, 02_35_52 PM" src="https://github.com/user-attachments/assets/6a48a9dd-d2a6-4a9f-8bae-3399b09d1574" />

# Roles
Users roles below, using NextAuth.js for authetication.


| Role      | Main job                                                         |
| --------- | ---------------------------------------------------------------- |
| Attendee  | Register, join team(Incase of Hackathon), check in, Participate. |
| Organizer | Create events, review applications, manage teams/check-in/grants |
| Sponsor   | View sponsored events, leads, visibility, analytics              |
| Admin     | Manage whole Clyyo platform                                      |

# Frontend(Next.js)
- Landing pages
- Browsing event and details pages
- Dashboards
- Forms
- Authentication UI
- Server Components
- Calling the API
- File uploads
- Displaying analytics

# Backend (NestJS) 
- Authentication
- Authorization (RBAC)
- Events
- Registrations
- Team formation
- QR generation
- Certificates
- AI orchestration
- Payment processing
- Email sending
- Notifications
- Travel grants
- Analytics
- Webhooks
- Background jobs

# Worker Service
Examples:
- Email Queue
- Generate Certificates
- Generate QR Codes
- AI Review
- AI Team Matching
- Attendance Prediction
- Image Compression
- PDF Generation
