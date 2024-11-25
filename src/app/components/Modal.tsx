'use client'; // Using client component for client-side rendering
import { useRouter, useSearchParams } from "next/navigation"; // Import hooks for navigation and URL search parameters
import api from "../utils/api"; // Import API utility for making HTTP requests

// Modal component for confirming task deletion
const Modal = ({ handleModalToggle }: any) => {
    const router = useRouter(); // Initialize the router for navigation
    const searchParams = useSearchParams(); // Access the current URL's search parameters

    // Function to navigate back to the home page and close the modal
    const handleBack = () => {
        router.push('/'); // Navigate to the homepage
        router.refresh(); // Refresh the page to fetch the latest data
        handleModalToggle(); // Toggle the modal's visibility
    };

    // Function to handle task deletion
    const handleDelete = async () => {
        const id = searchParams.get('id'); // Get the task ID from the search parameters
        console.log(id);

        const res = await api.delete(`/${id}`); // Make a DELETE request to remove the task

        console.log(res);

        if (res.status === 204) { // Check if the deletion was successful
            console.log('Deleted successfully');
            handleModalToggle(); // Close the modal
            window.location.replace('/'); // Redirect to the homepage
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            {/* Modal content */}
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    {/* Modal header */}
                    <h3 className="text-2xl font-bold text-gray-900">Confirm Remove Task</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-lg text-gray-500">Click Delete to remove</p>
                    </div>
                    {/* Modal actions */}
                    <div className="flex justify-between mt-4">
                        {/* Button to cancel deletion and go back */}
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Back to safety
                        </button>
                        {/* Button to confirm deletion */}
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
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