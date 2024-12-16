const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import CORS middleware to handle cross-origin requests
const bodyParser = require('body-parser'); // Import middleware for parsing request bodies
const taskRoutes = require('./routes/tasks'); // Import task-related routes
const errorHandler = require('./middlewares/errorHandler'); // Import global error handler middleware

const app = express(); // Create an Express application

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/tasks', taskRoutes); // Mount task routes under the '/tasks' path
app.use(errorHandler); // Use the global error handler middleware

module.exports = app; // Export the app instance for use in the server setup
