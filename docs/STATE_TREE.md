# Frontend State Tree

```text
App
├── AuthProvider
│   ├── user
│   ├── token
│   ├── isAuthenticated
│   ├── login()
│   ├── register()
│   └── logout()
└── Router
    ├── PublicRoute
    │   └── LoginPage / RegisterPage
    └── ProtectedLayout
        ├── Sidebar
        ├── Topbar
        ├── DashboardPage
        │   ├── dashboardMetrics (derived from API data)
        │   ├── projectProgress
        │   └── recentActivities
        ├── ProjectsPage
        │   ├── projects
        │   └── selectedProject
        ├── BoardPage
        │   ├── tasks
        │   ├── filters
        │   └── draggedTaskId (transient UI state)
        └── ActivityPage
            └── activities
```

## State ownership

| State | Owner | Persistence |
|---|---|---|
| Auth user and token | AuthProvider | Token in localStorage; user refreshed from API |
| Projects | Projects/Dashboard page | Server / MongoDB |
| Tasks | Board page | Server / MongoDB |
| Board filters | Board page | In-memory UI state |
| Dragged task ID | Board page | Transient |
| Activity feed | Activity page / Dashboard | Server / MongoDB |
| Modal open/close | Owning page/component | Transient |

## Mock / planned API endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Authenticate |
| GET | `/auth/me` | Current user |
| GET/POST | `/projects` | List/create projects |
| GET/PATCH/DELETE | `/projects/:id` | Read/update/delete project |
| GET/POST | `/tasks` | List/create tasks |
| GET/PATCH/DELETE | `/tasks/:id` | Read/update/delete task |
| GET | `/activities` | Recent activity |
| GET | `/dashboard` | Summary metrics |
