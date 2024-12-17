const express = require('express'); // Import the Express framework
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskControllers'); // Import task controller methods
const router = express.Router(); // Create a new Express router instance

// Route to get all tasks
router.get('/', getTasks);

// Route to create a new task
router.post('/', createTask);

// Route to update an existing task by ID
router.put('/:id', updateTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router; // Export the router for use in the main application
