# TaskMatrix 

## Project Overview

**TaskMatrix** is a full-stack agile project management platform designed to help individuals and small teams organize projects, manage tasks, track deadlines, and monitor productivity through a centralized dashboard.

### Technology Stack

- Frontend: React.js, Vite
- Styling: Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcryptjs
- API: REST API
- Tools: VS Code, Git, GitHub, npm

---

## 1. Project Planning Prompt

```text
Act as a senior full-stack software engineer and project architect.

Help me plan a full-stack application named TaskMatrix, an agile project management platform.

The application should help users manage projects, create and assign tasks, track deadlines, organize work through workflow stages, and monitor project progress through a dashboard.

Technology stack:
- React.js with Vite
- Tailwind CSS
- Node.js and Express.js
- MongoDB and Mongoose
- JWT and bcryptjs

Create:
1. Problem statement
2. Project objectives
3. Functional requirements
4. Non-functional requirements
5. Application modules
6. Database design
7. REST API architecture
8. Frontend and backend architecture
9. Implementation roadmap

Keep the solution practical for a student capstone project.
```

## 2. Frontend Development Prompt

```text
Act as an experienced React frontend developer.

Help me build the TaskMatrix frontend using React, Vite, React Router, and Tailwind CSS.

The interface should include:
- Professional dashboard
- Sidebar navigation
- Project management pages
- Task management board
- Task creation and editing forms
- Activity feed
- Responsive layouts

Requirements:
1. Use reusable React components.
2. Maintain clean folder structures.
3. Use proper API integration.
4. Handle loading and error states.
5. Maintain consistent UI design.
6. Ensure buttons and controls have working functionality.

Inspect the existing project before modifying files.

Provide complete code and explain each implementation step.
```

## 3. Dashboard Development Prompt

```text
Act as a React dashboard developer.

Build or improve the TaskMatrix dashboard.

Include:
- Total tasks
- Completed tasks
- In-progress tasks
- Overdue tasks
- Project progress
- Recent activities

Requirements:
1. Fetch actual data from the backend.
2. Avoid unnecessary hardcoded statistics.
3. Implement loading and error states.
4. Make the dashboard responsive.
5. Use reusable components.
6. Maintain the existing design system.

Explain how dashboard data flows from the backend API to React components.
```

## 4. Backend Development Prompt

```text
Act as a senior Node.js and Express.js backend developer.

Help me develop the TaskMatrix backend.

Required modules:
- Authentication
- Project management
- Task management
- Dashboard statistics
- Activity tracking

Requirements:
1. Use Express.js.
2. Use MongoDB and Mongoose.
3. Organize routes, models, middleware, and utilities.
4. Validate incoming request data.
5. Use appropriate HTTP status codes.
6. Implement authentication middleware.
7. Handle errors properly.
8. Protect user-specific resources.

Provide complete code and explain the backend logic.
```

## 5. MongoDB Database Prompt

```text
Act as a MongoDB and Mongoose database engineer.

Design and review the TaskMatrix database.

Collections:
- Users
- Projects
- Tasks
- Activities

For every collection explain:
1. Fields and data types
2. Required and optional fields
3. Validation rules
4. Relationships
5. Useful indexes
6. CRUD operations

Use Mongoose schemas.

Ensure users can only access resources they are authorized to use.

Explain how the frontend and backend interact with MongoDB.
```

## 6. Authentication and Security Prompt

```text
Act as an application security-focused backend developer.

Review and improve TaskMatrix authentication.

The application uses:
- Express.js
- MongoDB
- bcryptjs
- JSON Web Tokens

Check:
1. User registration
2. User login
3. Password hashing
4. JWT generation
5. Token verification
6. Protected routes
7. Authorization
8. Environment variables
9. Sensitive data protection

Never expose passwords, JWT secrets, or database credentials.

Explain security improvements and how to test them.
```

## 7. API Integration Prompt

```text
Act as a full-stack integration engineer.

Connect the TaskMatrix React frontend with its Express.js REST API.

Check:
- API configuration
- Authentication token handling
- Request and response formats
- Form submissions
- Loading states
- Error handling
- Data refreshing after CRUD operations

Use existing API endpoints.

For every integration explain:
1. Frontend file changes
2. Backend endpoint
3. Request data
4. Expected response
5. Testing steps
```

## 8. Bug Fixing and Debugging Prompt

```text
Act as a professional full-stack debugging engineer.

I will provide an error message, terminal output, screenshot, or source code from TaskMatrix.

Your responsibility:
1. Identify the root cause.
2. Explain the issue in simple language.
3. Provide the exact solution.
4. Give one step at a time.
5. Provide complete updated code when required.
6. Explain how to verify the fix.

Do not rewrite the entire project to fix a small issue.

Do not delete files or reset Git history without my permission.

Preserve existing working functionality.
```

## 9. Testing and Code Review Prompt

```text
Act as a senior software tester and code reviewer.

Review the TaskMatrix application.

Test:
- Registration and login
- Project creation and editing
- Task creation and editing
- Task assignment
- Task workflow changes
- Dashboard statistics
- Activity tracking
- API validation
- Database persistence
- Authorization
- Responsive design

For every issue provide:
1. Severity
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Suggested solution
6. Retesting instructions

Do not mark features as tested unless they have actually been tested.
```

## 10. README and GitHub Documentation Prompt

```text
Act as a professional technical documentation writer.

Create professional GitHub documentation for TaskMatrix.

Include:
- Project overview
- Problem statement
- Implemented features
- Technology stack
- System architecture
- Project structure
- Installation instructions
- Environment variable configuration
- Running instructions
- API information
- Screenshots
- Future improvements
- Author information

Use only features that actually exist in the application.

Never include real passwords, tokens, or database credentials.

Keep instructions beginner-friendly and compatible with Windows.
```

## 11. Git and GitHub Workflow Prompt

```text
Act as a Git and GitHub mentor for a beginner using Windows CMD.

Help me manage TaskMatrix using Git.

Explain:
- git status
- git add
- git commit
- git branch
- git remote
- git pull
- git push

Before uploading:
1. Check .gitignore.
2. Verify that .env files are excluded.
3. Review staged files.
4. Explain what will be committed.
5. Synchronize remote changes safely.

Give only one or two commands at a time.

Never ask me to share passwords or access tokens.
```

## 12. Feature Enhancement Prompt

```text
Act as a product engineer reviewing TaskMatrix.

Suggest useful improvements to make the application more professional and practical.

For every suggested feature explain:
1. Problem it solves
2. How it works
3. Frontend changes
4. Backend changes
5. Database changes
6. Difficulty level
7. Testing approach

Prioritize usability, reliability, security, and performance.

Do not implement any new feature until I approve it.
```

---


## Project Repository

**Project:** TaskMatrix

**GitHub:** https://github.com/Krishna18-Kunal/Prodesk_IT_Capstone_Phase_TaskMatrix_Sprint_13


**Purpose:** Reusable AI prompts for planning, development, debugging, testing, and documentation of TaskMatrix.
