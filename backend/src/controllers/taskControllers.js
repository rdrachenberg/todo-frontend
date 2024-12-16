const prisma = require('@prisma/client').PrismaClient; // Import the Prisma Client for database operations
const db = new prisma(); // Initialize the Prisma Client

// Controller to fetch all tasks from the database
exports.getTasks = async (req, res) => {
  try {
    const tasks = await db.task.findMany(); // Retrieve all tasks from the 'task' table
    res.json(tasks); // Send the tasks as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle and respond with an error message
  }
};

// Controller to create a new task
exports.createTask = async (req, res) => {
  const { title, color } = req.body; // Extract task details from the request body
  try {
    const task = await db.task.create({ 
      data: { title, color, completed: false } // Insert a new task with default 'completed' status as false
    });
    res.status(201).json(task); // Respond with the created task and a 201 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle and respond with an error message
  }
};

// Controller to update an existing task
exports.updateTask = async (req, res) => {
  const { id } = req.params; // Extract task ID from the request parameters
  const { title, color, completed } = req.body; // Extract updated details from the request body
  try {
    const task = await db.task.update({
      where: { id: parseInt(id) }, // Find the task by ID
      data: { title, color, completed }, // Update the task details
    });
    res.json(task); // Respond with the updated task
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle and respond with an error message
  }
};

// Controller to delete a task by its ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params; // Extract task ID from the request parameters
  try {
    await db.task.delete({ where: { id: parseInt(id) } }); // Delete the task from the database
    res.status(204).end(); // Respond with a 204 No Content status to indicate successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle and respond with an error message
  }
};
