# System Architecture & Data Model

## 1. High-level architecture

```mermaid
flowchart LR
  U[Browser / User] --> R[React + Vite UI]
  R -->|HTTPS JSON REST| A[Express API]
  A --> AU[JWT Auth Middleware]
  AU --> S[Service / Route Logic]
  S --> M[Mongoose Models]
  M --> DB[(MongoDB)]
  S --> L[Activity Log]
```

## 2. Deployment view

```mermaid
flowchart TB
  subgraph Client
    V[React SPA]
    LS[Local token storage]
  end
  subgraph Server
    EX[Express application]
    MW[Auth + validation middleware]
    ROUTES[REST routes]
  end
  subgraph Persistence
    MDB[(MongoDB database)]
  end
  V --> EX
  LS --> V
  EX --> MW --> ROUTES --> MDB
```

## 3. Entity relationship diagram

```mermaid
erDiagram
  USER ||--o{ PROJECT : owns
  USER ||--o{ TASK : assigned
  PROJECT ||--o{ TASK : contains
  USER ||--o{ ACTIVITY : performs
  PROJECT ||--o{ ACTIVITY : records

  USER {
    ObjectId _id
    string name
    string email
    string passwordHash
    date createdAt
  }
  PROJECT {
    ObjectId _id
    string name
    string description
    ObjectId owner
    date createdAt
  }
  TASK {
    ObjectId _id
    string title
    string description
    string status
    string priority
    date dueDate
    ObjectId project
    ObjectId assignee
    ObjectId createdBy
  }
  ACTIVITY {
    ObjectId _id
    ObjectId actor
    ObjectId project
    string action
    string message
    date createdAt
  }
```

## 4. MongoDB collections

- `users`: account identity and password hash.
- `projects`: project metadata and owner reference.
- `tasks`: task details, workflow state, priority, due date and references.
- `activities`: user action feed.

## 5. State management tree

See `STATE_TREE.md` for the frontend state tree and ownership rules.

## 6. Security boundaries

- Passwords hashed with bcrypt.
- JWT checked on protected routes.
- User identity comes from verified token, not request body.
- Project/task access is scoped to the authenticated user.
- Environment variables hold database URI and JWT secret.
- Production hardening: rate limiting, Helmet, strict CORS, schema validation, audit logs and security tests.
