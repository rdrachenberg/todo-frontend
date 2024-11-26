'use client'; // for nextjs client-side rendering

import React, { useState, useEffect } from 'react'; // Import React library and hooks
import { TaskCounterProps } from '../types'; // Import type definition for TaskCounter props
import { useTasks } from '../context/TasksContext'; // Import custom hook to access tasks context

// Component to display the count of completed tasks
export const CompletedCounter: React.FC<TaskCounterProps> = ({ label, color }) => {
    const { tasks } = useTasks(); // Access tasks from the context
    const [completedCount, setCompletedCount] = useState<number>(0); // State to store the count of completed tasks

    // Function to calculate the count of completed tasks
    const getCompletedCount = (tasks: any[]) => 
        tasks.filter(task => task.completed).length; // Filter tasks where `completed` is true

    useEffect(() => {
        if (tasks?.length > 0) { // Ensure there are tasks to process
            const count = getCompletedCount(tasks); // Calculate the completed task count
            setCompletedCount(count); // Update the state with the count
        }
    }, [tasks]); // Re-run the effect whenever the tasks array changes

    return (
        <div className="flex gap-2 items-center">
            {/* Label for the completed tasks counter */}
            <div className={`self-stretch my-auto text-sm ${color}`}>{label}</div>
            {/* Display the count of completed tasks */}
            <div className="self-stretch px-2 py-0.5 my-auto text-xs bg-zinc-800 rounded-full text-zinc-300">
                {completedCount}
            </div>
        </div>
    );
};
