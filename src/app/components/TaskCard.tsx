'use client'; // for nextjs client-side rendering

import { ImageProps, TaskCardProps } from '../types'; // Import type definitions for props
import Image from 'next/image'; // Import Next.js Image component for optimized images
import { useState } from 'react'; // Import React state management
import api from '../utils/api'; // Import Axios instance for API requests
import { useRouter } from 'next/navigation'; // Import Next.js router for navigation
import Modal from './Modal'; // Import Modal component
import { useTasks } from '../context/TasksContext'; // Import tasks context hook

// Reusable NotificationImage component for displaying icons
const NotificationImage: React.FC<ImageProps> = ({ src, alt, className }) => (
    <Image
        width={24} // Set image width
        height={24} // Set image height
        loading="lazy" // Lazy load the image
        src={src} // Source of the image
        alt={alt} // Alternative text for accessibility
        className={`object-contain shrink-0 w-[24px] aspect-square ${className || ''}`} // Apply additional classes if provided
    />
);

// TaskCard component for rendering individual tasks
const TaskCard: React.FC<TaskCardProps> = ({ message, startIcon, endIcon, id, completed }) => {
    const [isChecked, setIsChecked] = useState<boolean>(completed); // State for tracking task completion
    const [show, setShow] = useState<boolean>(false); // State for modal visibility
    const router = useRouter(); // Initialize Next.js router
    const { tasks, setTasks } = useTasks(); // Access tasks context

    // Function to sort tasks by completion status and creation date
    const sortTasks = (tasks: any[]) =>
        tasks
            .sort((a, b) => b.createdAt - a.createdAt) // Sort by creation date (descending)
            .sort((a, b) => a.completed - b.completed); // Then by completion status

    // Toggle modal visibility
    const handleModalToggle = () => setShow((prev) => !prev);

    // Toggle task completion status and update the tasks context
    const handleCheckClick = async () => {
        const updatedStatus = !isChecked; // Toggle the current status
        setIsChecked(updatedStatus); // Update local state

        try {
            const response = await api.put(`/${id}`, { completed: updatedStatus }); // Send API request to update the task

            if (response.status === 200) {
                console.log('Record updated successfully');
                // Update the task in the context and re-sort
                const updatedTasks = tasks.map((task) =>
                    task?.id === id ? { ...task, completed: updatedStatus } : task
                );
                setTasks(sortTasks(updatedTasks)); // Update the context with sorted tasks
            }
        } catch (error) {
            console.error('Failed to update task:', error); // Log errors if the update fails
        }
    };

    // Handle task deletion and open the modal
    const handleDeleteClick = () => {
        router.push(`/?id=${id}&show=true`); // Update the URL with task ID
        setShow(true); // Show the modal
    };

    // Render task card content based on completion status
    const renderTaskContent = () => (
        <article
            className={`flex flex-wrap gap-3 items-start p-4 h-full rounded-lg border shadow-sm bg-neutral-800 w-[736px] max-md:max-w-full ${
                isChecked ? 'border-neutral-800 text-zinc-500' : 'border-zinc-800 text-zinc-100'
            }`}
        >
            {/* Checkbox for marking task completion */}
            <div onClick={handleCheckClick}>
                <NotificationImage
                    src={isChecked ? '/checked.png' : startIcon} // Use different icons based on completion
                    alt={isChecked ? 'Task completed' : 'Mark task as completed'}
                    className={isChecked ? 'w-6 outline outline-4 -outline-offset-4 outline-violet-600 rounded-full' : ''} // Highlight completed tasks
                />
            </div>
            {/* Task message */}
            <div
                className="flex-1 shrink basis-0 max-md:max-w-full"
                onClick={() => router.push(`/detail/${id}?id=${id}`)} // Navigate to task details
            >
                <p className={`flex-1 shrink basis-0 ${isChecked ? 'line-through' : ''}`}>{message}</p>
            </div>
            {/* Delete button */}
            <div className="hover:bg-red-700 rounded-full" onClick={handleDeleteClick}>
                <NotificationImage src={endIcon} alt="Delete task" />
            </div>
        </article>
    );

    return (
        <div>
            {/* Task card section */}
            <section role="alert" aria-live="polite" className="flex text-sm leading-5">
                {renderTaskContent()}
            </section>
            {/* Render modal if visible */}
            {show && <Modal handleModalToggle={handleModalToggle} />}
        </div>
    );
};

export default TaskCard; // Export the TaskCard component
