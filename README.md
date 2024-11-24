# Todo Frontend Application

A user-friendly interface built with **Next.js** for managing tasks. This frontend communicates with an existing **Express.js** backend server through RESTful API calls.

## Features
- Built with **Next.js** for performance and modern web development practices.
- Full CRUD functionality for managing tasks.
- Responsive design, ensuring compatibility across devices.
- Seamless API communication with the backend server.

## Prerequisites
Before setting up the frontend, ensure:
- The **Express.js** backend server is up and running (refer to its repository for setup instructions).
- The backend server's API is accessible via a base URL.

## Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/rdrachenberg/todo-frontend.git
cd todo-frontend
```

### Step 2: Install Dependencies
Install all required dependencies:
```bash
npm install
```

### Step 3: Start the Development Server
Run the following command to start the frontend application:
```bash
npm run dev
```

The development server will start at `http://localhost:3000`.  Open this URL in your browser to access the application.

## How It Works
- The frontend makes HTTP requests (GET, POST, PUT, DELETE) to the backend server at `http://localhost:8080/tasks` endpoints.
    - This can be edited in the /src/app/utils/api.tsx file.
- Routes
    - GET /tasks
    - POST /tasks
    - PUT /tasks/:id
    - DELETE /tasks/:id
- All task-related data is managed by the backend and retrieved through API calls.

## Project Structure
```
/src/app/components  - Reusable React components
/src/app             - Next.js applications
/public              - Static assets
/styles              - Global and component-specific styles
```

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.
- `npm run lint`: Lint the codebase for issues.

## Troubleshooting
 * **Connection Issues:** Verify the backend API endpoint is reachable from the frontend.

## Contributing
We welcome contributions! Feel free to fork the repository, create issues, or submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

