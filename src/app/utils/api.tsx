import axios from 'axios'; // Import Axios for making HTTP requests

// Define the base URL for the API depending on the environment
const url = process.env.NODE_ENV === 'production' 
  ? '/tasks' // Use relative URL for production
  : 'http://localhost:8080/tasks'; // Use localhost for development

// Create an Axios instance with the configured base URL
const api = axios.create({
  baseURL: `${url}`, // Set the base URL for all requests made with this instance
});

export default api; // Export the Axios instance for use in the application
