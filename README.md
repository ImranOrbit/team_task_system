Team Task System
A responsive task management application built with React and TypeScript as a practical frontend exercise for WEBNS Technology Ltd.

The application is designed for a small team that needs a simple and reliable way to view, search, filter, sort, create, update, and manage work.

The primary focus of this implementation is a clean and responsive user interface, realistic data handling, clear task states, and a workflow that remains usable across desktop, tablet, and mobile screen sizes.

🔗 Project Links
Live Demo: <your-live-deployment-url>
GitHub Repository: <your-github-repository-url>
Replace the two placeholders above with your actual deployed URL and GitHub repository URL before submission.

📸 Screenshots
Desktop — 1280px
Add your 1280px screenshot here:

screenshots/desktop-1280.png

Tablet — 768px
Add your 768px screenshot here:

screenshots/tablet-768.png

Mobile — 375px
Add your 375px screenshot here:

screenshots/mobile-375.png

The exercise specifically asks for screenshots at 375px, 768px, and 1280px. Add the actual images to the repository and embed them here before submission.

✨ Features
Responsive task management interface
Search tasks by title, description, or assignee
Filter tasks by status
Filter tasks by priority
Filter tasks by assignee
Sort tasks by creation date, due date, title, priority, or status
Ascending and descending sorting
Paginated task list
Create new tasks
Update task status directly from the task card
Delete tasks
Visual status and priority indicators
Overdue task detection
Loading state
Error state with retry action
Context-aware empty state
Mobile-friendly filter controls
Keyboard-friendly form controls
Visible focus states
Disabled states for unavailable actions
Realistic mock data with 500 tasks
Long titles and long assignee names for layout testing
Missing descriptions, assignees, and due dates
Overdue, current, and future due dates
Shareable search, filter, sort, and pagination state through the URL
Browser back/forward navigation support
🛠 Tech Stack
React
TypeScript
Vite
Tailwind CSS
Lucide React
Faker.js
The application does not use a pre-built component library such as:

Material UI
Ant Design
Chakra UI
Pre-built data grids
The interface is built using custom React components and Tailwind CSS.

🚀 Getting Started
Requirements
Make sure the following are installed:

Node.js 18 or newer
npm 9 or newer
Installation
Clone the repository:

git clone <your-github-repository-url>

Navigate to the project directory:

cd team-task-system

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will display the local development URL in the terminal.

Open that URL in a browser.

📦 Production Build
Create a production build:

npm run build

Preview the production build:

npm run preview

📊 Data Source
This project is intentionally frontend-only and uses a local mock database.

The mock database generates 500 task records using Faker.js and provides operations for:

Querying tasks
Searching tasks
Filtering tasks
Sorting tasks
Paginating results
Creating tasks
Updating tasks
Deleting tasks
Getting task assignees
This approach keeps the project focused on the frontend requirements of the exercise.

No external database or backend service is required to run the application.

🧩 Data Model
A task consists of the following fields:

Field	Type	Required	Description
id	string	Yes	Unique task identifier
title	string	Yes	Short description of the work
description	string	No	Additional task context
assignee	string	No	Person responsible for the task
status	TaskStatus	Yes	Current workflow stage
priority	Priority	Yes	Task importance or urgency
dueDate	string	No	Optional task deadline
createdAt	string	Yes	Task creation timestamp
updatedAt	string	Yes	Last update timestamp

Why These Fields?
The data model is intentionally small.

The main problem is helping a team quickly understand:

What needs to be done
Who owns it
How important it is
Where it is in the workflow
When it is due
Each field directly supports one of those decisions.

I intentionally did not add comments, attachments, tags, departments, time tracking, activity history, or other secondary metadata because they are not necessary for the core workflow described in the exercise.

🔄 Workflow
The application uses four workflow stages:

Todo
The task has been identified but work has not started.

In Progress
The task is currently being worked on.

Review
The work is ready for validation or review.

Done
The work has been completed.

Why Four Stages?
I chose four stages because they provide useful workflow visibility without creating unnecessary process overhead.

A simpler workflow such as:

Todo → In Progress → Done

would also be valid, but Review represents a common point in a team's workflow where completed implementation still needs validation before being considered finished.

🎯 Priority System
Tasks use four priority levels:

Priority	Visual Meaning
Low	Low urgency
Medium	Normal priority
High	Important
Urgent	Immediate attention

The colour system intentionally makes urgency easy to scan.

Low — Slate
Medium — Amber
High — Orange
Urgent — Red
Urgent work therefore has a stronger visual signal than normal work without making the entire interface visually noisy.

🔵 Status System
Status colours are intentionally separate from priority colours:

Status	Colour
Todo	Slate
In Progress	Blue
Review	Violet
Done	Emerald

This prevents status and priority from being visually confused.

For example, a completed task and a low-priority task should not communicate exactly the same meaning just because both happen to be green.

💡 Product Decisions
Card-Based Layout
I chose a card-based layout instead of a traditional data table.

The main reason is responsive behaviour.

The exercise requires the application to work at 375px, 768px, 1280px, and the widths in between. A dense desktop table would require significant restructuring on mobile.

Cards allow task information to remain grouped together while naturally adapting from multiple columns to a single-column layout.

First-Screen Priorities
The first screen focuses on the information and actions a team member is most likely to need:

Team task statistics
Search
Filters and sorting
Task list
Pagination
Creating a new task
This keeps the main workflow accessible without requiring users to navigate through multiple screens.

Search
Search supports:

Task title
Description
Assignee
This allows users to find a specific piece of work quickly without needing to remember its exact title.

Filtering
The primary filters are:

Status
Priority
Assignee
These represent the most useful ways for a team member to narrow the backlog to what matters to them.

Mobile Filters
Desktop users see the filter controls inline.

On mobile, the filter controls are placed behind a dedicated filter toggle. This prevents multiple dropdowns from being squeezed into a narrow horizontal row.

Task Status Updates
Task status can be changed directly from the task card.

This avoids forcing users to open a separate edit screen for a common action.

Visual Urgency
Priority colours, overdue indicators, and status badges allow users to understand the state of the backlog by scanning rather than reading every task.

📱 Responsive Behaviour
The interface was designed around three target widths:

375px — Mobile
The mobile layout uses:

Single-column task cards
Full-width search
Collapsed filter controls
Touch-friendly buttons and controls
Wrapped header actions
No horizontal scrolling
768px — Tablet
The layout moves toward a tablet configuration with:

Multi-column task cards where space allows
More visible filtering controls
Comfortable spacing
Responsive header layout
1280px — Desktop
The desktop layout uses:

Wider content container
Multi-column task cards
Inline filter controls
Clear separation between dashboard statistics, filters, and task content
The layout uses responsive CSS rather than separate desktop and mobile applications.

🔗 Shareable Views
Search, filters, sorting, and pagination are represented in the URL.

This means a filtered task view can be copied and shared with another team member.

Example:

/tasks?search=payment&status=review&priority=urgent&page=2

Opening the same URL should reproduce the same task view.

Browser back and forward navigation also preserves the user's previous task views.

⏳ Loading, Error, and Empty States
The application treats loading, error, and empty results as different situations.

Loading
A dedicated loading state is shown while the initial task data is being loaded.

Error
If the task request fails, an error state is displayed with a retry action.

Empty
If search or filters produce no results, the empty state explains that no tasks match the current criteria and suggests adjusting the search or filters.

This is intentionally different from the initial loading and error states.

♿ Accessibility
The interface uses semantic HTML controls for:

Search
Select filters
Buttons
Task status changes
Interactive controls include:

Hover states
Focus-visible states
Disabled states where appropriate
Accessible labels for icon-only actions
The layout also considers touch target size for mobile users.

Colour is not the only method used to communicate task information; text labels accompany status and priority indicators.

🧪 Realistic Test Data
The application intentionally uses a dataset of 500 tasks.

The generated dataset includes:

Short titles
Long titles
Long assignee names
Tasks without descriptions
Tasks without assignees
Tasks without due dates
Overdue tasks
Tasks due in the future
Different priorities
Different workflow stages
Multiple assignees
One intentionally long assignee is:

Christopher Jonathan Pennington

The purpose of the dataset is to test how the interface behaves with realistic content instead of only testing against a small set of perfectly sized records.

🎯 Scope Decisions
This submission is intentionally frontend-only.

The exercise states that a frontend-only submission with mocked data can receive full credit on the frontend requirements.

I therefore prioritised:

Visual quality
Responsive behaviour
Search and filtering
Workflow interaction
Realistic test data
Loading/error/empty states
Accessibility
Component structure
rather than spending the exercise time building a backend.

❌ Features Not Built
The following features were intentionally excluded:

Authentication
User accounts
Team management
Comments
Attachments
Notifications
Activity history
Real-time collaboration
Bulk task actions
Drag-and-drop Kanban
Advanced analytics
File uploads
Backend persistence
These features could be useful in a production application, but they are outside the core problem defined by the exercise.

Keeping them out allowed the implementation to remain focused and polished within the available time.

🏗 Architecture
The project separates UI components, application state, data access, and TypeScript types.

src/
├── components/
│   ├── common/
│   │   ├── ErrorState.tsx
│   │   └── LoadingSpinner.tsx
│   ├── dashboard/
│   │   └── StatsCards.tsx
│   └── tasks/
│       ├── CreateTaskModal.tsx
│       ├── TaskCard.tsx
│       ├── TaskFilters.tsx
│       ├── TaskList.tsx
│       ├── TaskPagination.tsx
│       └── TaskSearch.tsx
│
├── hooks/
│   └── useTasks.ts
│
├── services/
│   ├── api.ts
│   └── mockDatabase.ts
│
├── types/
│   └── task.ts
│
├── App.tsx
└── main.tsx

The component structure keeps individual UI responsibilities small and makes the main application easier to reason about.

🔌 Mock API Layer
The UI communicates with the task data through an API-style service layer rather than directly manipulating task arrays inside components.

This makes the frontend easier to adapt to a real backend later.

A future API implementation could replace the mock service while keeping most of the UI components unchanged.

🗄 Backend
No backend is included in this submission.

A production implementation could use PostgreSQL and move search, filtering, sorting, and pagination to the database layer.

For this exercise, the frontend-only approach was intentional because the primary evaluation criteria focus on:

Frontend product judgement
Visual craft
Responsive behaviour
CSS/component architecture
Interaction quality
🤔 Less Certain Decisions
1. Card Layout vs. Table
I am least certain whether an experienced operations team might prefer a dense table for scanning a very large backlog.

I chose cards because mobile usability is an explicit requirement and cards provide a more natural responsive layout.

A future version could test a compact table on desktop while retaining cards on mobile.

2. Review Workflow Stage
The brief does not prescribe workflow stages.

I chose Review because work often needs validation before it should be considered complete.

For a simpler team process:

Todo → In Progress → Done

could be preferable.

3. Immediate Search
Search updates as the user types.

This provides a fast interaction for the current dataset size.

If the application were connected to a large production backend, I would consider debouncing search requests and moving search execution to the server.

🤖 AI Tooling
AI tooling was used during development as a coding and review assistant.

I used AI to help with:

React and TypeScript refactoring
Component structure review
Tailwind CSS improvements
Responsive layout review
Accessibility review
Converting emoji-based UI icons to Lucide React icons
Search and filtering logic review
Loading, error, and empty state improvements
Code readability and consistency
Reviewing the implementation against the exercise requirements
README/documentation drafting
All generated suggestions were reviewed and adapted during development.

I understand the submitted implementation and can explain or modify the code during a technical follow-up.

✅ Testing Checklist
Before submission, the application should be manually checked at:

375px
768px
1280px
Several widths between those targets
The following interactions should also be tested:

Search
Clear search
Status filter
Priority filter
Assignee filter
Sorting
Pagination
Creating a task
Updating task status
Deleting a task
Empty search result
Error/retry state
Keyboard navigation
Browser back/forward navigation
Refreshing a shared URL
Long task titles
Long assignee names
Missing descriptions
Missing assignees
Missing due dates
Overdue tasks
⚖️ Trade-offs
The main trade-off was scope.

Instead of building a broad project with authentication, backend infrastructure, comments, attachments, notifications, and multiple secondary screens, I focused on making the core task-management workflow clear and reliable.

The intended workflow is:

Find work
   ↓
Understand priority and ownership
   ↓
Update progress
   ↓
Add new work

The product is intentionally small and opinionated rather than feature-heavy.

🚀 Future Improvements
If this were continued as a production application, the next improvements would likely include:

PostgreSQL-backed persistence
Server-side search, filtering, sorting, and pagination
Authentication and role management
Task editing
Activity history
Comments
Real-time updates
Bulk task actions
Drag-and-drop workflow management
Automated accessibility testing
Automated component and integration tests
These were intentionally kept outside the scope of this exercise.

📝 Conclusion
The application focuses on the core problem described in the exercise: helping a small team understand and manage its work quickly.

The implementation prioritises:

Clear visual hierarchy
Fast search and filtering
Obvious priority and status
Responsive behaviour
Realistic data
Simple task interactions
Accessible controls
Deliberate scope
The goal was to build a focused product experience rather than a large collection of features.