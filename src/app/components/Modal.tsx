'use client'; // for nextjs client-side rendering

import { useRouter, useSearchParams } from "next/navigation"; // Import hooks for navigation and search parameters
import api from "../utils/api"; // Import Axios instance for API requests
import { useTasks } from "../context/TasksContext"; // Import custom hook for tasks context

// Modal component for confirming task deletion
const Modal = ({ handleModalToggle }: { handleModalToggle: () => void }) => {
    const router = useRouter(); // Initialize the router for navigation
    const searchParams = useSearchParams(); // Access the current URL's search parameters
    const { tasks, setTasks } = useTasks(); // Access tasks and setter from the context

    // Function to navigate back to the homepage and close the modal
    const handleBack = () => {
        router.push('/'); // Navigate to the homepage
        handleModalToggle(); // Close the modal
    };

    // Function to handle task deletion
    const handleDelete = async () => {
        const id = searchParams.get('id'); // Retrieve task ID from search parameters

        if (!id) {
            console.error('No task ID found in search parameters.'); // Log an error if ID is missing
            return;
        }

        const numericId = Number(id); // Convert ID to a number
        // console.log('ID to delete:', numericId);
        // console.log('Current tasks:', tasks);

        try {
            const response = await api.delete(`/${id}`); // Send DELETE request to the API

            if (response.status === 204) { // Check if the deletion was successful
                console.log('Task deleted successfully');

                // Filter out the deleted task from the tasks array
                const updatedTasks = tasks.filter((task: any) => {
                    // console.log(`Checking task ID: ${task.id} against ${numericId}`);
                    return task.id !== numericId;
                });
                // console.log('Updated tasks:', updatedTasks);

                // Update the tasks context with the filtered tasks
                setTasks([...updatedTasks]); // Pass a new array reference to trigger reactivity

                handleModalToggle(); // Close the modal
                router.push('/'); // Refresh the URL to reflect changes
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error while deleting task:', error); // Log any errors encountered
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Confirm Remove Task</h3>
                    <p className="mt-2 px-7 py-3 text-lg text-gray-500">
                        Click Delete to remove this task.
                    </p>
                    <div className="flex justify-between mt-4">
                        {/* Button to cancel deletion and navigate back */}
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Back to safety
                        </button>
                        {/* Button to confirm task deletion */}
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal; // Export the Modal component
