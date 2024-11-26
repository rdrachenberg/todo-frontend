'use client'; // for nextjs client-side rendering

import React, { useEffect, useState } from 'react'; // Import React and hooks
import { ColorButton } from '../../components/ColorButton'; // Import ColorButton component
import { TaskInput } from '../../components/TaskInput'; // Import TaskInput component
import { SaveButton } from '../../components/SaveButton'; // Import SaveButton component
import { Header } from '../../components/Header'; // Import Header component
import Image from 'next/image'; // Import Next.js Image component for optimized images
import { useRouter, useSearchParams } from 'next/navigation'; // Import hooks for navigation and search parameters
import api from 'src/app/utils/api'; // Import Axios instance for API requests
import getTask from '../../utils/getTask'; // Import utility to fetch a specific task
import { useTasks } from '../../context/TasksContext'; // Import tasks context

// Detail component for editing task details
const Detail: React.FC = () => {
    const [taskTitle, setTaskTitle] = useState(''); // State to store the task title
    const [selectedColor, setSelectedColor] = useState(''); // State to store the selected color
    const router = useRouter(); // Initialize Next.js router for navigation
    const searchParams = useSearchParams(); // Access the search parameters from the URL
    const { tasks, setTasks } = useTasks(); // Access tasks and setter from the context
    const id = searchParams.get('id'); // Get the task ID from the search parameters

    // Fetch task details when the component mounts or when the ID changes
    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (!id) return; // If no ID is provided, exit

            try {
                const task = await getTask(id); // Fetch task details
                setTaskTitle(task?.title || ''); // Set task title if available
                setSelectedColor(task?.color || ''); // Set task color if available
            } catch (error) {
                console.error('Error fetching task:', error); // Log any errors
            }
        };

        fetchTaskDetails();
    }, [id]);

    // Navigate back to the previous page
    const handleBack = () => router.back();

    // Handle form submission to update the task
    const handleFormSubmission = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!id) return; // Exit if no task ID is provided

        try {
            const response = await api.put(`/${id}`, { title: taskTitle, color: selectedColor }); // Update the task via API

            if (response.status === 200) { // Check if the update was successful
                console.log(`Task ${id} updated successfully`);

                // Update tasks context with the modified task
                setTasks((prevTasks: any[]) =>
                    prevTasks.map((task) =>
                        task?.id === id ? { ...task, title: taskTitle, color: selectedColor } : task
                    )
                );

                window.location.href = '/'; // Redirect to the homepage
            }
        } catch (error) {
            console.error('Error updating task:', error); // Log any errors
        }
    };

    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33F6',
        '#33FFF6', '#F6FF33', '#FF3333', '#33FF33', '#3333FF',
    ]; // Array of available colors

    return (
        <main className="flex flex-col overflow-hidden pb-96 bg-zinc-900 max-md:pb-24">
            <Header /> {/* Render the header */}
            <section className="flex flex-col self-center mt-24 w-[736px] max-w-full max-md:mt-10">
                {/* Back button */}
                <Image
                    src="/left_arrow_icon.png"
                    width={100}
                    height={100}
                    alt="Back"
                    className="object-contain w-4 aspect-square cursor-pointer"
                    onClick={handleBack} // Navigate back on click
                />

                {/* Form for editing task details */}
                <form
                    onSubmit={handleFormSubmission} // Handle form submission
                    className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full"
                >
                    {/* Input for task title */}
                    <TaskInput value={taskTitle} onChange={setTaskTitle} />

                    {/* Color selection */}
                    <div className="flex flex-col mt-6 self-start max-md:max-w-full">
                        <label className="text-sm font-bold text-blue-400">Color</label>
                        <div className="flex flex-wrap gap-4 mt-3 items-start max-md:max-w-full">
                            {colors.map((color) => (
                                <ColorButton
                                    key={color} // Unique key for each color button
                                    color={color} // Pass the color
                                    onClick={() => setSelectedColor(color)} // Set the selected color on click
                                    isSelected={selectedColor === color} // Indicate if the color is selected
                                />
                            ))}
                        </div>
                    </div>

                    {/* Save button */}
                    <div className="mt-12 max-md:mt-10">
                        <SaveButton
                            onClick={handleFormSubmission} // Handle save button click
                            isDisabled={!taskTitle || !selectedColor} // Disable button if inputs are invalid
                        />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Detail; // Export the Detail component
