## Team Task System ##
Practical exercise — React Front-End Developer
WEBNS Technology Ltd.
A responsive task management application built with React and TypeScript for a small team to view, search, filter, sort, create, update, and manage their work.
The main goal of this project was to keep the workflow simple, responsive, and easy to scan while still handling realistic task data.
## Project Links
•GitHub Repository: <https://github.com/ImranOrbit/team_task_system>

## Screenshots
Desktop — 1280px
Add the 1280px screenshot here:
screenshots/desktop-1280.png
Tablet — 768px
Add the 768px screenshot here:
screenshots/tablet-768.png
Mobile — 375px
Add the 375px screenshot here:
screenshots/mobile-375.png
The screenshots cover the three required target widths from the exercise.
________________________________________
## Features
•	Responsive task management interface
•	Search by task title, description, or assignee
•	Filter by status, priority, and assignee
•	Sort by creation date, due date, title, priority, or status
•	Ascending and descending sorting
•	Pagination
•	Create new tasks
•	Update task status directly from a task card
•	Delete tasks
•	Task details view
•	Visual status and priority indicators
•	Overdue task indicators
•	Loading, error, and empty states
•	Error retry action
•	Mobile-friendly filter controls
•	Keyboard-friendly controls
•	Visible focus states
•	Disabled states where needed
•	Realistic mock data with 500 tasks
•	Long task titles and assignee names for layout testing
•	Missing descriptions, assignees, and due dates
•	Overdue, current, and future due dates
•	Search, filters, sorting, and pagination stored in the URL
•	Browser back/forward navigation support
•	Shareable filtered views
________________________________________
## Tech Stack
•	React
•	TypeScript
•	Vite
•	Tailwind CSS
•	Lucide React
•	Faker.js
The interface uses custom React components and Tailwind CSS instead of a pre-built component library such as Material UI, Ant Design, Chakra UI, or a pre-built data grid.
________________________________________
## Getting Started
Requirements
Make sure you have:
•	Node.js 18 or newer
•	npm 9 or newer
Installation
Clone the repository:
git clone <your-github-repository-url>
Move into the project directory:
cd team-task-system
Install dependencies:
npm install
Start the development server:
npm run dev
Vite will show the local development URL in the terminal.
Open that URL in your browser.
________________________________________
## Data Source
This is a frontend-only project and uses a local mock database.
The mock database generates 500 task records using Faker.js. It supports:
•	Searching
•	Filtering
•	Sorting
•	Pagination
•	Creating tasks
•	Updating tasks
•	Deleting tasks
•	Getting task assignees
No external database or backend service is required.
I chose mock data because the exercise allows a frontend-only implementation and the main focus is the frontend experience.
________________________________________
## Data Model
A task contains these fields:
Field	Type	Required	Description
id	string	Yes	Unique task identifier
title	string	Yes	Task title
description	string	No	Additional task information
assignee	string	No	Person responsible for the task
status	TaskStatus	Yes	Current workflow stage
priority	Priority	Yes	Task urgency
dueDate	string	No	Optional deadline
createdAt	string	Yes	Creation date
updatedAt	string	Yes	Last update date
Why these fields?
I kept the data model small because the main questions a team member needs to answer are:
•	What needs to be done?
•	Who owns it?
•	How important is it?
•	What stage is it in?
•	When is it due?
I did not add comments, attachments, tags, departments, time tracking, or activity history because they were not necessary for the main workflow in this exercise.
________________________________________
## Workflow
The application uses four task stages:
1.	Todo — The work has been identified but has not started.
2.	In Progress — The task is currently being worked on.
3.	Review — The work is ready for checking or validation.
4.	Done — The work has been completed.
I chose four stages because they provide more useful visibility than a simple Todo → Done workflow without adding too much complexity.
The Review stage is useful because completed implementation often still needs validation before it can be considered finished.
________________________________________
## Priority System
There are four priority levels:
Priority	Meaning
Low	Low urgency
Medium	Normal priority
High	Important
Urgent	Needs immediate attention
Priority uses a separate visual system from task status so users can understand urgency and workflow stage independently.
________________________________________
## Product Decisions
Card-based layout
I chose cards instead of a traditional table.
The main reason was responsive behaviour. The application needs to work at 375px, 768px, 1280px, and the widths between them.
Cards allow the task information to stay grouped together and naturally change from multiple columns on larger screens to a single column on smaller screens.
What is on the first screen?
The main screen contains:
•	Team task statistics
•	Search
•	Filters and sorting
•	Task list
•	Pagination
•	New Task action
These are the actions a team member is most likely to need when managing a backlog.
Search
Search works across:
•	Task title
•	Description
•	Assignee
This makes it possible to find work even when the user does not remember the exact task title.
Filtering
The main filters are:
•	Status
•	Priority
•	Assignee
These allow a team member to quickly narrow the backlog to the work that matters to them.
Mobile filters
On smaller screens, filters use a dedicated mobile control instead of forcing several dropdowns into one horizontal row.
This keeps the interface usable on a phone.
Task status
Status can be changed directly from the task card.
This avoids opening another screen for a common action.
Task details
Clicking a task opens its details view. The task can also be opened using the keyboard.
The browser back button returns to the previous task/list state.
Visual urgency
Priority badges and overdue indicators make urgent or late work easier to notice without reading every task.
________________________________________
## Responsive Behaviour
The application was designed for the three required widths and the sizes between them.
375px — Mobile
•	Single-column task cards
•	Full-width search
•	Mobile filter controls
•	Touch-friendly controls
•	Responsive header
•	No horizontal scrolling
768px — Tablet
•	More available space for task cards
•	Responsive filtering
•	Comfortable spacing
•	Responsive header layout
1280px — Desktop
•	Wider content area
•	Multi-column task cards
•	Visible filter controls
•	Clear separation between statistics, filters, and task content
The same application and components are used across all screen sizes.
________________________________________
## Shareable Views
Search, filters, sorting, and pagination are stored in the URL.
For example:
/tasks?search=payment&status=review&priority=urgent&page=2
This allows a filtered view to be copied and shared with another team member.
Opening the URL restores the same search/filter/sort/page state.
Browser back and forward navigation are also supported.
________________________________________
## Loading, Error, and Empty States
The application treats these as three different situations.
Loading
A loading state is shown while the initial task data is being loaded.
Error
If loading the task data fails, an error message is shown with a retry action.
Empty
If a search or filter produces no results, the empty state explains that no tasks match the current criteria and suggests changing the search or filters.
________________________________________
## Accessibility
The application uses normal HTML controls for interactive elements such as:
•	Search input
•	Select controls
•	Buttons
•	Status changes
Interactive elements include:
•	Hover states
•	Focus-visible states
•	Active states
•	Disabled states
•	Accessible labels for icon-only buttons
Task cards can be opened using the keyboard, and the interface avoids relying only on colour to communicate status or priority.
________________________________________
## Realistic Test Data
The application uses 500 tasks to make the interface behave more like a real backlog.
The data includes:
•	Short task titles
•	Long task titles
•	Long assignee names
•	Tasks without descriptions
•	Tasks without assignees
•	Tasks without due dates
•	Overdue tasks
•	Current/future due dates
•	Different priorities
•	Different workflow stages
•	Multiple assignees
One intentionally long assignee name is:
Christopher Jonathan Pennington
This helps test whether the layout handles content that is longer than expected.
________________________________________
## Scope Decisions
I kept this project focused on the core task-management workflow.
The main priorities were:
•	Visual quality
•	Responsive behaviour
•	Search and filtering
•	Sorting and pagination
•	Task workflow
•	Realistic data
•	Loading/error/empty states
•	Accessibility
•	Simple component structure
I chose not to spend the available time on backend infrastructure because the exercise allows a frontend-only submission with mocked data.

## Mock API Layer
The UI communicates with task data through an API-style service layer.
This keeps data operations separate from the UI components and makes it easier to replace the mock implementation with a real backend later.
For example, a future backend could handle search, filtering, sorting, and pagination without requiring major changes to the UI.
________________________________________
## Decisions I Am Least Certain About
1. Card layout vs. table
A table could be faster for an experienced operations team scanning a large number of tasks.
I chose cards because mobile usability is an explicit requirement and cards adapt more naturally to smaller screens.
A future version could test a compact table on desktop while keeping cards on mobile.
2. Review stage
The brief does not define the workflow stages.
I chose Review because work often needs validation before it becomes Done.
A simpler workflow such as:
Todo → In Progress → Done
could also work for some teams.
3. Immediate search
Search currently updates while the user types.
This works well for the current 500-task mock dataset.
For a production backend with much larger data, I would consider debouncing the search and moving the search operation to the server.
________________________________________
## AI Tooling
AI tooling was used during development as a coding and review assistant.
I used it mainly for:
•	React and TypeScript refactoring
•	Component structure suggestions
•	Tailwind CSS improvements
•	Responsive layout review
•	Accessibility review
•	Search and filtering logic review
•	Loading, error, and empty state improvements
•	Code readability and consistency
•	Reviewing the implementation against the exercise requirements
•	README drafting
I reviewed and adapted the suggestions during development.
I understand the submitted implementation and can explain and modify the code during a technical follow-up.
________________________________________
## Testing Checklist
Before submission, I checked the application at:
•	375px
•	768px
•	1280px
•	Intermediate screen widths
The following interactions should also be tested before final submission:
•	Search
•	Clear search
•	Status filter
•	Priority filter
•	Assignee filter
•	Sorting
•	Pagination
•	Creating a task
•	Updating task status
•	Deleting a task
•	Opening task details
•	Returning from task details
•	Empty search results
•	Error/retry state
•	Keyboard navigation
•	Browser back/forward navigation
•	Refreshing a shared URL
•	Long task titles
•	Long assignee names
•	Missing descriptions
•	Missing assignees
•	Missing due dates
•	Overdue tasks

________________________________________
## Conclusion
This project focuses on the main problem from the exercise: helping a small team understand and manage its work quickly.
The implementation prioritises:
•	Clear visual hierarchy
•	Fast search and filtering
•	Easy-to-understand status and priority
•	Responsive behaviour
•	Realistic data
•	Simple task interactions
•	Accessible controls
•	Shareable views
•	Deliberate scope
The goal was not to build every possible task-management feature, but to build the core workflow well and make the interface reliable across desktop, tablet, and mobile.
