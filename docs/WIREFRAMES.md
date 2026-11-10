# UI/UX Wireframes — TaskMatrix

These low-fidelity structural wireframes define the DOM layout before implementation. Recreate/refine them in Figma and add the public Figma URL to this file before the capstone review.

## Viewport 1 — Authentication (desktop 1440 × 900)

```text
+-----------------------------------------------------------------------+
| TASKMATRIX                                                   Help     |
|                                                                       |
|             +---------------------------------------+                 |
|             | Welcome back                          |                 |
|             | Sign in to your workspace             |                 |
|             |                                       |                 |
|             | Email                                 |                 |
|             | [_________________________________]   |                 |
|             | Password                              |                 |
|             | [_________________________________]   |                 |
|             | [             Sign in              ]  |                 |
|             |                                       |                 |
|             | New to TaskMatrix? Create account     |                 |
|             +---------------------------------------+                 |
+-----------------------------------------------------------------------+
```

## Viewport 2 — Main dashboard (desktop 1440 × 900)

```text
+----------------+------------------------------------------------------+
| TM  TaskMatrix | Topbar: Search tasks                 User / Profile |
|----------------+------------------------------------------------------|
| Overview       | Good morning, teammate                             |
| My Tasks       | Your team's delivery at a glance                    |
| Projects       |                                                      |
| Activity       | [Total tasks] [In progress] [Completed] [Overdue]    |
| Settings       |                                                      |
|                | Project progress                                  |
|                | +------------------------------------------------+ |
|                | | Project A  ===================          72%   | |
|                | | Project B  ==============             48%   | |
|                | +------------------------------------------------+ |
|                | Recent activity                                   |
|                | - Alex moved API integration to Review             |
|                | - You created onboarding checklist                 |
+----------------+------------------------------------------------------+
```

## Viewport 3 — Project Kanban board (desktop 1440 × 900)

```text
+----------------+------------------------------------------------------+
| Sidebar        | Project: Website Revamp              [+ Add task]   |
|                | Filters: [All priorities] [All assignees]           |
|                |                                                      |
|                | TO DO          IN PROGRESS       REVIEW       DONE   |
|                | +----------+   +----------+   +----------+ +------+ |
|                | | Task A   |   | Task C   |   | Task E   | |Task G| |
|                | | High     |   | Medium   |   | High     | |Low   | |
|                | | Due date |   | Due date |   | Due date | |Done  | |
|                | +----------+   +----------+   +----------+ +------+ |
|                | +----------+   +----------+                         |
|                | | Task B   |   | Task D   |                         |
|                | +----------+   +----------+                         |
+----------------+------------------------------------------------------+
```

## Viewport 4 — Task details (mobile 390 × 844)

```text
+--------------------------------------+
| < Back          Task details         |
|--------------------------------------|
| Build authentication API             |
| [High priority] [In Progress]        |
|                                      |
| Description                          |
| Implement register and login routes. |
|                                      |
| Assignee                             |
| [alex@example.com                 v] |
|                                      |
| Due date                             |
| [2026-11-20                       ]  |
|                                      |
| Project                              |
| [Website Revamp                   v] |
|                                      |
| [             Save changes         ] |
+--------------------------------------+
```

## Responsive behavior

- Desktop: persistent sidebar and multi-column Kanban board.
- Tablet: compact sidebar and horizontally scrollable board.
- Mobile: collapsible navigation, stacked dashboard cards and horizontally scrollable Kanban columns.
- Forms: full-width controls on mobile, labels always visible.
- Figma deliverable: create desktop dashboard, project board and mobile task-detail frames; paste public view link here.

**Figma URL:** TODO — add your own public Figma file link.
