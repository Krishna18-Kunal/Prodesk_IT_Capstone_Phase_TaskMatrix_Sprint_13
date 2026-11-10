# TaskMatrix — Agile Project Management Platform

TaskMatrix is a full-stack project-management application for small software teams. It provides project workspaces, task tracking, Kanban workflow, team assignment, priorities, due dates, dashboard metrics and an activity feed.

## 1. Product overview

**Problem:** Small teams often spread work across chat messages, spreadsheets and disconnected task lists. This makes ownership, deadlines and project progress difficult to track.

**Solution:** TaskMatrix centralizes project work in a single workspace. Team members can create projects, add and assign tasks, move tasks through workflow stages and monitor progress.

**Target users:** Student software teams, small development teams, project coordinators and individual contributors.

## 2. Current MVP features

- Register and log in using email and password (JWT authentication).
- Seed/demo account for immediate local testing.
- Dashboard with task totals, completion rate, overdue work and recent activity.
- Create, edit and delete projects.
- Create, edit and delete tasks.
- Kanban board with drag-and-drop status changes.
- Filter tasks by project, priority and status.
- Assign tasks to team members by email.
- Due dates, priority labels, task descriptions and status.
- Activity feed for important task and project events.
- Responsive layout for desktop and mobile.
- MongoDB persistence with Mongoose.
- Local fallback storage when MongoDB is not configured (development/demo only).

## 3. Technology stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| Styling | Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | bcryptjs, JSON Web Tokens |
| API | REST / JSON |
| Drag and drop | Native HTML Drag and Drop API |

## 4. Prerequisites

- Node.js 20 or newer (LTS recommended)
- npm
- VS Code
- MongoDB Atlas account OR local MongoDB Community Server (optional for demo fallback)

Check installation:

```bash
node -v
npm -v
```

## 5. Run locally on Windows

1. Extract the ZIP.
2. Open the extracted `TaskMatrix` folder in VS Code.
3. Open Terminal → New Terminal.
4. Install dependencies:

```bash
npm install
```

5. Create the environment file:

```bash
copy server\.env.example server\.env
```

6. Open `server/.env`. For MongoDB persistence, replace `MONGODB_URI` with your Atlas connection string. If you leave it blank, the server uses temporary in-memory demo data that resets when the server restarts.

7. Start both applications:

```bash
npm run dev
```

8. Open the frontend at `http://localhost:5173`.
   Backend health endpoint: `http://localhost:5000/api/health`.

### Demo login

- Email: `demo@taskmatrix.local`
- Password: `TaskMatrix123!`

The demo account is created automatically on first startup. Change the demo password before using this outside local evaluation.

## 6. Environment variables

See `server/.env.example`.

- `PORT`: API server port (default 5000)
- `MONGODB_URI`: MongoDB connection string; optional for local demo
- `JWT_SECRET`: long random secret for signing tokens
- `CLIENT_ORIGIN`: frontend origin (default `http://localhost:5173`)

## 7. Repository structure

```text
TaskMatrix/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── server/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── index.js
├── docs/
│   ├── PRD.md
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── STATE_TREE.md
│   ├── WIREFRAMES.md
│   └── PROMPTS.md
└── README.md
```

## 8. Important scope notes

This is a working capstone MVP foundation, not a production-certified enterprise SaaS product. Before public deployment, add automated tests, email verification, password reset, rate limiting, audit logging, stronger validation, backups, monitoring and security review. The in-memory fallback is only for local demonstration; use MongoDB for persistent data.

## 9. Suggested development roadmap

- Sprint 13: PRD, wireframes, architecture and repository blueprint.
- Sprint 14: Authentication, project workspace and MVP dashboard.
- Sprint 15: Full task workflows, assignment, filtering and activity.
- Sprint 16: Polish, accessibility, testing and optional integrations.
- Sprint 17: CI/CD, deployment and final demonstration.

## 10. Capstone demo flow

1. Sign in with the demo account.
2. Review dashboard metrics.
3. Open a project.
4. Create a task and assign it.
5. Drag the task from To Do to In Progress and then Done.
6. Filter by priority or project.
7. Review the activity feed.
8. Explain the database collections and API architecture using the `docs/` folder.
