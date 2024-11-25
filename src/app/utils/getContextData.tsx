import api from "../utils/api"; // Import the Axios instance for API calls

// Function to fetch context data (tasks) from the API
export async function getContextData() {
    // Fetch tasks data from the base endpoint
    const data = await api.get('/'); 

    // Extract the data payload from the API response
    const tempTask = await data.data;

    // Resolve or reject a Promise based on the presence of data
    const dataResolved = await new Promise((resolve, reject) => {
        if (tempTask) {
            resolve(tempTask); // Resolve the Promise with the fetched tasks
        } else {
            reject('Error occurred in the getContextData file'); // Reject the Promise with an error message
        }
    });

    return dataResolved; // Return the resolved data
}
