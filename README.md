# SupportFlow — Help Desk & Ticket Management API

SupportFlow is a backend system for managing customer support requests. Businesses will be able to organize tickets, assign them to support agents, and track issues through resolution.

The goal is to go beyond CRUD APIs and learn how to design a real-world Node.js backend with authentication, authorization, relational data, validation, automated tests, and reliable background jobs.

## Project status

SupportFlow is in its initial setup stage. The current implementation includes:

- TypeScript with Express.
- Separate application setup (`src/app.ts`) and server entry point (`src/server.ts`).
- JSON request parsing and Helmet middleware.
- A `GET /health` endpoint that returns `200` with `{"status":"ok"}`.
- Scripts for development, building, and running the compiled server.

The features below describe the intended system. Authentication, database persistence, ticket management, automated tests, and background jobs are not implemented yet.

## How it will work

1. **A customer submits a ticket.** For example, “I can't reset my password.” A ticket contains a title, description, priority, and status.
2. **The backend validates and stores it.** Express handles the request, Zod validates incoming data, and permission checks enforce access before Prisma saves the ticket in PostgreSQL.
3. **A support agent handles the issue.** An assigned agent views the ticket, adds replies, investigates, and updates its status.
4. **The ticket is resolved.** The customer can view the final status and conversation history.

## Organizations and roles

SupportFlow will be a multi-tenant application: multiple businesses share the system while keeping their data separate.

| Role | Intended permissions |
| --- | --- |
| Admin | Manage their organization's support agents and tickets. |
| Support agent | View assigned tickets, reply, and update ticket status. |
| Customer | Create tickets, view their own tickets, and reply. |

Every ticket and conversation must be accessible only within the correct organization and according to the user's role. Company A must never be able to access Company B's tickets, even if someone guesses a ticket ID.

## Planned features

- **Authentication and authorization:** registration, login, password hashing, JWT authentication, and role-based permissions.
- **Ticket management:** create, retrieve, update, assign, prioritize, and resolve tickets, with pagination and filtering.
- **Ticket conversations:** persistent replies from customers and agents, restricted to authorized users.
- **Background jobs:** notifications and other asynchronous tasks processed outside HTTP requests using Redis and BullMQ, added later.
- **Testing and reliability:** coverage for API behavior, validation, permissions, organization isolation, error handling, database interactions, and important edge cases.

The backend API comes first. A React frontend is optional after the core API is working.

## Technology stack

| Technology | Purpose | Status |
| --- | --- | --- |
| Node.js | Backend runtime | In use |
| TypeScript | Static typing | In use |
| Express | HTTP requests, middleware, and routes | In use |
| Helmet | HTTP security headers | In use |
| Zod | Incoming request validation | Installed; integration planned |
| PostgreSQL | Storage for organizations, users, tickets, and replies | Planned |
| Prisma | Database access and schema migrations | Planned |
| JWT + password hashing | Authentication | Planned |
| Vitest + Supertest | Automated API tests | Planned |
| Redis + BullMQ | Background jobs | Planned for a later milestone |

## Getting started

Install Node.js and npm, then run these commands from the project directory:

```sh
npm install
npm run dev
```

The development server watches for changes and listens on port `3000` by default. Set the `PORT` environment variable to use another port.

Check that the server is running:

```sh
curl http://localhost:3000/health
```

Expected response:

```json
{"status":"ok"}
```

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the development server with file watching. |
| `npm run build` | Compile TypeScript into `dist/`. |
| `npm start` | Run `dist/server.js` after building. |
| `npm test` | Currently a placeholder that exits with an error; tests are not configured yet. |

PostgreSQL, Redis, and authentication configuration are not required for the current health endpoint. Setup instructions will be added as those features are implemented.

## First milestone and roadmap

The first working version should let a user register, log in, and create and retrieve tickets with proper validation, database persistence, and access controls.

Development order:

1. **Application setup:** configure TypeScript, Express, `app.ts`, and `server.ts`. The initial setup is in place.
2. **Database:** connect PostgreSQL and configure Prisma.
3. **Identity:** implement users, authentication, and organizations.
4. **Core tickets:** implement ticket creation and retrieval with validation and organization-scoped access.
5. **Support workflow:** extend authorization, add status updates, and implement ticket replies.
6. **Verification and jobs:** add automated API tests, then introduce background jobs.

## Learning goals

- Trace an HTTP request through middleware, routes, controllers, services, and the database.
- Keep business logic in services instead of scattering it across route handlers.
- Design relational tables, relationships, and indexes.
- Prevent unauthorized access and cross-organization data leaks.
- Handle concurrent requests, validation failures, and database errors.
- Verify behavior with automated tests instead of relying on manual API calls.
- Process background work reliably.

The guiding principle is to write the code yourself, use Codex for explanations or review, and understand every important line. The outcome should be a working portfolio project and the independent backend skills to explain its architecture confidently in interviews.
