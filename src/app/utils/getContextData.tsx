import api from "../utils/api"; // Import the Axios instance for API calls

// Function to fetch context data (tasks) from the API
export async function getContextData() {
    try {
        // Fetch tasks data from the base endpoint
        const response = await api.get('/'); 
        
        // If the API returns data, return it directly
        if (response.data) {
            return response.data; // Return the fetched tasks data
        } else {
            throw new Error('No tasks data found.'); // Throw an error if no data is returned
        }
    } catch (error) {
        console.error("Error fetching data from API:", error); // Log any errors during the fetch
        throw new Error('Error occurred while fetching tasks data'); // Throw a new error to be handled by the caller
    }
}
