# TaskMatrix — Task Management Platform

TaskMatrix is a full-stack project-management application for small software teams. It provides project workspaces, task tracking, Kanban workflow, team assignment, priorities, due dates, dashboard metrics and an activity feed.

## 1. Product overview

**Problem:** Small teams often spread work across chat messages, spreadsheets and disconnected task lists. This makes ownership, deadlines and project progress difficult to track.

**Solution:** TaskMatrix centralizes project work in a single workspace. Team members can create projects, add and assign tasks, move tasks through workflow stages and monitor progress.

**Target users:** Student software teams, small development teams, project coordinators and individual contributors.

## 2. Current MVP features

- Register and log in using email and password (JWT authentication).
- Seed account for immediate local testing.
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
- Local fallback storage when MongoDB is not configured (development only).

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
- MongoDB Atlas account OR local MongoDB Community Server (optional for  fallback)

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
└── README.md
└── PROMPTS.md
```

## 8. Important scope notes

This is a working capstone MVP foundation, not a production-certified enterprise SaaS product. Before public deployment, add automated tests, email verification, password reset, rate limiting, audit logging, stronger validation, backups, monitoring and security review. The in-memory fallback is only for local demonstration; use MongoDB for persistent data.

## 9. Suggested development roadmap

- Sprint 13: PRD, wireframes, architecture and repository blueprint.
- Sprint 14: Authentication, project workspace and MVP dashboard.
- Sprint 15: Full task workflows, assignment, filtering and activity.
- Sprint 16: Polish, accessibility, testing and optional integrations.
- Sprint 17: CI/CD, deployment and final demonstration.

## 10. Capstone 

1. Sign in with the  account.
2. Review dashboard metrics.
3. Open a project.
4. Create a task and assign it.
5. Drag the task from To Do to In Progress and then Done.
6. Filter by priority or project.
7. Review the activity feed.
8. Explain the database collections and API architecture using the `docs/` folder.
