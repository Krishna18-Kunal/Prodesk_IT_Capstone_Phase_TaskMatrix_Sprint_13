# REST API Contract

Base URL: `http://localhost:5000/api`

Protected endpoints require:

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

## Authentication

### POST `/auth/register`

```json
{ "name": "Alex", "email": "alex@example.com", "password": "StrongPass123!" }
```

### POST `/auth/login`

```json
{ "email": "demo@taskmatrix.local", "password": "TaskMatrix123!" }
```

Response:

```json
{ "token": "<jwt>", "user": { "id": "...", "name": "Alex", "email": "alex@example.com" } }
```

### GET `/auth/me`

Returns the authenticated user profile.

## Projects

- `GET /projects`
- `POST /projects` — `{ "name": "Website Revamp", "description": "..." }`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

## Tasks

- `GET /tasks?projectId=&status=&priority=&search=`
- `POST /tasks` — `{ "title": "...", "description": "...", "project": "...", "status": "todo", "priority": "high", "dueDate": "2026-11-20", "assigneeEmail": "demo@taskmatrix.local" }`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Allowed statuses: `todo`, `inprogress`, `review`, `done`.  
Allowed priorities: `low`, `medium`, `high`, `urgent`.

## Dashboard and activity

- `GET /dashboard`
- `GET /activities`

## Error shape

```json
{ "message": "Human-readable error message" }
```

HTTP status codes: 200/201 success, 400 invalid input, 401 unauthenticated, 403 forbidden, 404 missing resource, 500 unexpected server error.
