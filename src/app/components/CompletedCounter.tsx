'use client'; // Using client component for client-side rendering
import * as React from 'react'; // Import React library
import { TaskCounterProps } from '../types'; // Import the type definition for task counter props
import { useState, useEffect } from 'react'; // Import React hooks for state and effects
import { useTasks } from '../context/TasksContext'; // Import the custom context for tasks

// Component for displaying the count of completed tasks
export const CompletedCounter: React.FC<TaskCounterProps> = ({ label, color }) => {
    const { tasks } = useTasks() as any; // Access tasks from the context
    const [completedCount, setCompletedCount] = useState<number>(0); // State to store the count of completed tasks
    const tempTasks = tasks; // Temporary reference to the tasks list

    // Function to calculate the number of completed tasks
    const getCompleted = () => {
        let counter = 0; // Initialize the counter
        for (const completed in tempTasks) { // Iterate over the tasks
            const value = tempTasks[completed].completed; // Get the 'completed' status of each task
            if (value === true) { // Increment counter if the task is completed
                counter++;
            }
        }
        return counter; // Return the count of completed tasks
    };

    // Effect to calculate and set the count of completed tasks whenever the tasks list changes
    useEffect(() => {
        if (tempTasks?.length > 0) { // Ensure there are tasks to process
            const count = getCompleted(); // Get the count of completed tasks
            setCompletedCount(() => count); // Update the state with the count
        }
    }, [setCompletedCount, tempTasks]); // Re-run effect when tasks or setCompletedCount changes

    return (
        <div className="flex gap-2 items-center">
            {/* Display the label with the specified color */}
            <div className={`self-stretch my-auto text-sm ${color}`}>{label}</div>
            {/* Display the count of completed tasks */}
            <div className="self-stretch px-2 py-0.5 my-auto text-xs bg-zinc-800 rounded-[999px] text-zinc-300">
                {completedCount}
            </div>
        </div>
    );
};
