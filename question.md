# Task Manager with Filters

## Problem

Build a task management application that lets users create, update, delete, and filter tasks.

## Task fields

Each task contains:

- `id`
- `title`
- `description`
- `status`
- `priority`
- `dueDate`

## Features

- Create a new task
- Edit an existing task
- Delete a task
- Mark a task as completed
- Filter by:
  - Status
  - Priority
- Search tasks by title
- Sort tasks by due date
- Show separate sections for:
  - Pending
  - In Progress
  - Completed
- Validate that title is mandatory
- Display an appropriate empty state when no tasks match the filters

## Optional follow-up

How would you modify the application if tasks had to persist after refreshing the browser?

This project stores tasks in `localStorage` so the board survives a refresh.
