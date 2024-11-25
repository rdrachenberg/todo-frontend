import api from "./api"; // Import Axios instance for API requests

// Function to fetch a specific task by its ID
export default async function getTasks(id: string) {
    // Make an API call to fetch tasks with the provided ID
    const data = await api.get(`/?id=${id}`);
    
    // Extract the data payload from the response
    const oneTask = await data.data;

    // Find the task that matches the provided ID
    const findTask = oneTask.find((task: { id: string }) => `${task.id}`.includes(id));

    // Return the found task
    return findTask;
}
