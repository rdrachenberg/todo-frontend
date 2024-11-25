import { Dispatch, SetStateAction } from "react"; // Import types for state dispatch and setter actions
import api from "../utils/api"; // Import Axios instance for API calls

// Function to fetch task data and update state variables
export async function getData(
    setData: { 
        (value: SetStateAction<any[]>): void; 
        (value: SetStateAction<any[]>): void; 
        (arg0: any): void; 
    }, // Setter for tasks data
    setNumber: Dispatch<SetStateAction<number>> | undefined, // Optional setter for task count
    setCompletedCount: Dispatch<SetStateAction<number>> | undefined // Optional setter for completed task count
) {
    // Fetch task data from the API
    const data = await api.get('/');
    const tempTask = await data.data; // Extract the task data from the response
    let counter = 0; // Initialize a counter for completed tasks

    // Function to count completed tasks
    const getCompleted = () => {
        for (const completed in tempTask) { // Iterate through tasks
            const value = tempTask[completed].completed; // Access the 'completed' status
            if (value === true) { // Increment the counter if the task is completed
                counter++;
            }
        }
        console.log('counter here ', counter); // Debug log for the completed count
        return counter; // Return the count of completed tasks
    };

    const count = await getCompleted(); // Get the count of completed tasks
    setData(tempTask); // Update the tasks state
    setNumber!(tempTask.length); // Update the total number of tasks
    console.log('counter here ----> ', count); // Debug log for the completed count
    setCompletedCount!(() => count); // Update the completed task count state
    console.log(tempTask); // Debug log for task data

    return tempTask; // Return the fetched task data
}
