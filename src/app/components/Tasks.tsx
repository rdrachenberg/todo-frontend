'use client'; // Indicates this module is designed for client-side rendering

import React, { useState, useEffect } from "react"; // Import React library and hooks
import { EmptyTasks } from "./EmptyTask"; // Import component to display when there are no tasks
import TaskCard from "./TaskCard"; // Import component to display individual tasks
import { useTasks } from "../context/TasksContext"; // Import custom hook for tasks context

// Component to manage and display tasks
export const Task: React.FC = () => {
    const { tasks, setTasks } = useTasks() as any; // Access tasks and setTasks from context
    const [, setNumber] = useState<number>(0); // Unused state for additional task manipulation
    const [, setActualCount] = useState<number>(0); // Unused state for counting tasks
    const [lengthToggle, setLengthToggle] = useState<boolean>(true); // State to toggle between showing tasks or empty state

    // Function to sort tasks by creation date and completion status
    const sortTheData = () => {
        const tasksLength = tasks[0].length; // Get the length of the task list
        const taskSort = tasks[0]; // Access the list of tasks
        if (tasksLength > 0) {
            // Sort by creation date (descending) and then by completion status
            const sortOne = taskSort.sort((a: { createdAt: number }, b: { createdAt: number }) => a.createdAt - b.createdAt).reverse();
            const sortTwo = sortOne.sort((a: { completed: any }, b: { completed: any }) => a.completed - b.completed);
            return sortTwo as any[]; // Return the sorted tasks
        }
    };

    // Effect to sort tasks and handle the length toggle
    useEffect(() => {
        if (tasks?.[0] && tasks[0]?.length > 0) {
            const sorted = sortTheData(); // Sort the tasks
            setTasks(() => sorted); // Update the sorted tasks in context
            setLengthToggle(true); // Show the tasks
        }
        if (!tasks?.[0]) {
            setTasks(() => { [] }); // Reset tasks if none exist
            setLengthToggle(false); // Show the empty tasks state
        }
    }, [tasks, setTasks]); // Re-run the effect when tasks or setTasks change

    return (
        <div className="flex-grow">
            {/* Show empty state if there are no tasks */}
            {!lengthToggle && (
                <div>
                    <EmptyTasks 
                        message="You don't have any tasks registered yet."
                        submessage="Create tasks and organize your to-do items."
                    />
                </div>
            )}
            {/* Show tasks if they exist */}
            {tasks && (
                <div className='my-5 flex-grow'>
                    {lengthToggle && (
                        <div>
                            {/* Map over the tasks and render a TaskCard for each */}
                            {tasks.map((task: { id: number; title: string; completed: boolean }, index: React.Key | null | undefined) => (
                                <div key={index}>
                                    <TaskCard 
                                        key={task.id} 
                                        setTasks={setTasks} 
                                        setNumber={setNumber} 
                                        setActualCount={setActualCount} 
                                        message={task.title} 
                                        startIcon={'/unchecked.png'} 
                                        endIcon={'/trash.png'} 
                                        id={task.id} 
                                        completed={task.completed}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
