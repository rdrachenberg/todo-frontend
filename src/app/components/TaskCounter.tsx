'use client'; // Using client component for client-side rendering

import * as React from 'react'; // Import React library
import { TaskCounterProps } from '../types'; // Import the type definition for TaskCounter props
import { useState, useEffect } from 'react'; // Import React hooks for state and effects
import { useTasks } from '../context/TasksContext'; // Import custom hook for accessing tasks context

// Component to display a counter for the number of tasks
export const TaskCounter: React.FC<TaskCounterProps> = ({ label, color }) => {
    const { tasks } = useTasks() as any; // Access tasks from the context
    const [actualCount, setActualCount] = useState<number>(0); // State to store the count of tasks
    
    // Effect to calculate and update the number of tasks
    useEffect(() => {  
        const lengthOfArray = tasks?.length; // Get the number of tasks
        if (lengthOfArray > 0) { // If there are tasks in the array
            setActualCount(lengthOfArray); // Update the count with the array's length
            
            // Handle edge case where the first task might be an empty array
            if (tasks[0].length === 0) {
                setActualCount(0);
            }
        } else {
            setActualCount(0); // Set the count to 0 if there are no tasks
        }
    }, [setActualCount, tasks, actualCount]); // Dependencies to re-run the effect

    return (
        <div className="flex gap-2 items-center">
            {/* Display the label with specified color */}
            <div className={`self-stretch my-auto text-sm ${color}`}>{label}</div>
            {/* Display the actual count of tasks */}
            <div className="self-stretch px-2 py-0.5 my-auto text-xs bg-zinc-800 rounded-[999px] text-zinc-300">
                {actualCount}
            </div>
        </div>
    );
};