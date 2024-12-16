const app = require('./app'); // Import the Express application instance
const PORT = process.env.PORT || 8080; // Define the server port, defaulting to 8080 if not set in the environment

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Log a message to indicate the server is running
