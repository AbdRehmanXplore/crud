# Task API

A simple in-memory CRUD REST API for managing tasks, built with Express.js and documented with Swagger (OpenAPI 3.0).

## Features

- Create, read, update, and delete tasks
- In-memory data store (no database required)
- Interactive Swagger UI documentation
- Health check endpoint

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) v5
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) for serving API docs from [openapi.json](openapi.json)
- [nodemon](https://www.npmjs.com/package/nodemon) for auto-reloading in development

## Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes bundled with Node.js)

## Installation

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Project

**Development mode** (auto-restarts on file changes via nodemon):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Once running, the server is available at:

```
http://localhost:3000
```

## API Documentation (Swagger)

Interactive API documentation is served via Swagger UI at:

```
http://localhost:3000/api-docs
```

It's generated from the [openapi.json](openapi.json) spec file. Open the URL above in your browser after starting the server to explore and try out every endpoint directly.

## Endpoints

| Method | Endpoint     | Description                          | Request Body            | Success Response         | Error Response                |
|--------|--------------|---------------------------------------|--------------------------|---------------------------|--------------------------------|
| GET    | `/`          | Root greeting message                 | -                         | `200` plain text greeting | -                              |
| GET    | `/health`    | Health check                          | -                         | `200 { "status": "OK" }`  | -                              |
| GET    | `/tasks`     | List all tasks                        | -                         | `200` array of tasks      | -                              |
| POST   | `/tasks`     | Create a new task                     | `{ "title": string }`    | `201` created task        | `400` if title missing/empty   |
| GET    | `/tasks/:id` | Get a single task by ID               | -                         | `200` task object         | `404` if task not found        |
| PUT    | `/tasks/:id` | Update a task's title                 | `{ "title": string }`    | `200` updated task        | `400` invalid title / `404` not found |
| DELETE | `/tasks/:id` | Delete a task by ID                   | -                         | `200` deleted task        | `404` if task not found        |
| DELETE | `/test`      | Sanity-check endpoint for DELETE      | -                         | `200` plain text `DELETE works!` | -                       |

### Task object shape

```json
{
  "id": 1,
  "title": "Task 1",
  "done": false
}
```

## Example Requests

**Get all tasks**

```bash
curl http://localhost:3000/tasks
```

**Get one task**

```bash
curl http://localhost:3000/tasks/1
```

**Create a task**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Buy groceries\"}"
```

**Update a task**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Buy groceries and cook dinner\"}"
```

**Delete a task**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Project Structure

```
crud/
├── server.js       # Express app and route handlers
├── openapi.json     # OpenAPI 3.0 spec used by Swagger UI
├── package.json      # Dependencies and npm scripts
└── readme.md        # Project documentation
```

## Notes

- Data is stored in memory only — restarting the server resets tasks back to the default seed data (`Task 1`, `Task 2`, `Task 3`).
- No database or authentication is required to run this project.
