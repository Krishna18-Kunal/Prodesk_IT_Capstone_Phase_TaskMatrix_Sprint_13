# Product Requirements Document (PRD)
## TaskMatrix — Agile Project Management Platform

**Version:** 1.0  
**Status:** Capstone blueprint / MVP scope  
**Product type:** Responsive web application  
**Primary users:** Small software teams and student project teams

## 1. Executive summary

TaskMatrix is a centralized agile work-management platform. It helps a team organize projects, assign work, prioritize tasks, monitor deadlines and understand delivery progress. The MVP focuses on a clear Kanban workflow and project dashboard rather than attempting to reproduce every feature of Jira or Asana.

## 2. Problem statement

Small teams frequently coordinate through a combination of chat, spreadsheets and personal reminders. This creates fragmented task information, unclear ownership, missed deadlines and poor visibility into progress. TaskMatrix provides one shared source of truth for project work.

## 3. Goals and measurable outcomes

- A user can authenticate and access only their authorized workspace data.
- A project owner can create and manage projects.
- A team member can create, update, assign and move tasks.
- The board reflects status changes immediately.
- Dashboard metrics are calculated from actual task records.
- The interface remains usable on mobile and desktop.

**MVP success measures:** all primary CRUD flows complete; protected routes reject unauthenticated requests; task status changes persist; core screens render at mobile and desktop widths.

## 4. User personas

1. **Project lead:** creates projects, organizes tasks, assigns owners and monitors deadlines.
2. **Developer / contributor:** views assigned work, updates status and communicates task progress through descriptions and activity.
3. **Evaluator / reviewer:** reviews architecture, documentation, UI and the end-to-end demonstration.

## 5. Core user stories

- As a user, I can register and log in securely.
- As a project lead, I can create and edit a project.
- As a team member, I can create a task with title, description, priority and due date.
- As a project lead, I can assign a task to a registered team member.
- As a contributor, I can move a task between workflow columns.
- As a user, I can filter tasks by status, priority and project.
- As a user, I can see recent activity and project progress.

## 6. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Register and login with hashed passwords | P0 |
| FR-02 | JWT-protected API routes | P0 |
| FR-03 | Create, list, update and delete projects | P0 |
| FR-04 | Create, list, update and delete tasks | P0 |
| FR-05 | Kanban workflow: Todo, In Progress, Review, Done | P0 |
| FR-06 | Set task priority and due date | P0 |
| FR-07 | Assign task to a workspace member | P1 |
| FR-08 | Dashboard metrics and recent activity | P1 |
| FR-09 | Search and filter tasks | P1 |
| FR-10 | Responsive mobile layout | P1 |

## 7. Non-functional requirements

- Passwords are never stored in plain text.
- Protected API routes require a valid JWT.
- Inputs are validated on the server.
- API errors use consistent JSON responses.
- The UI supports keyboard-accessible form controls and readable contrast.
- Secrets are stored in environment variables, not committed to Git.
- MongoDB is used for persistent operation; in-memory fallback is only for local evaluation.

## 8. Scope boundaries

**In scope:** authentication, projects, tasks, assignment, Kanban, dashboard, filters, activity feed.

**Out of scope for MVP:** billing, native mobile apps, video calls, complex Gantt charts, enterprise SSO, external calendar sync, AI task planning and multi-tenant billing.

## 9. Assumptions and risks

- The capstone is built by one contributor.
- MongoDB Atlas or local MongoDB is available for persistent storage.
- Email notifications are not required for the first MVP.
- Drag-and-drop behavior must also have a status selector as an accessible alternative.
- Production deployment requires additional security, testing and operational controls.

## 10. Acceptance criteria

- A new user can register and log in.
- An authenticated user can create a project and a task.
- Task changes survive a server restart when MongoDB is configured.
- Dragging a card changes its status and persists it through the API.
- Dashboard counts match the task list.
- An unauthenticated user cannot access protected endpoints.
- The main screens work at common mobile and desktop viewport widths.
