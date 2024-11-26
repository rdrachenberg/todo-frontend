'use client'; // for nextjs client-side rendering

import React, { useState, useEffect } from "react"; // Import React and hooks
import { EmptyTasks } from "./EmptyTask"; // Component for displaying empty task state
import TaskCard from "./TaskCard"; // Component for displaying individual task cards
import { useTasks } from "../context/TasksContext"; // Custom hook for accessing task context
import Loader from "./Loader"; // Component for displaying a loading spinner

// Component to display and manage tasks
export const Task: React.FC = () => {
    const { tasks, setTasks } = useTasks(); // Access tasks and setter from the context
    const { totalCount, setTotalCount } = useTasks(); // Access total task count and its setter from the context
    const [loading, setLoading] = useState<boolean>(true); // State to track loading status
    const [isProcessing, setIsProcessing] = useState<boolean>(true); // State to track task processing
    const [sortedTasks, setSortedTasks] = useState<any[]>([]); // State to store sorted tasks
    const [delayedRender, setDelayedRender] = useState<boolean>(false); // State to manage delayed rendering of empty tasks

    // Function to sort tasks by completion status and updated date
    const sortTasks = (tasks: any[]) =>
        tasks.sort((a, b) => {
            // Primary sort: Incomplete tasks first
            if (a.completed !== b.completed) {
                return a.completed - b.completed; // Incomplete tasks first
            }

            // Secondary sort: Newest tasks (by updatedAt) first
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); // Newest tasks first
        });

    useEffect(() => {
        const processTasks = async () => {
            setLoading(true); // Indicate tasks are loading
            setIsProcessing(true); // Indicate tasks are being processed
            setDelayedRender(false); // Reset delayed render state

            if (tasks && tasks.length > 0) {
                const sorted = sortTasks(tasks); // Sort tasks
                // console.log("Sorted tasks:", sorted); // Log sorted tasks for debugging
                setTasks(sorted); // Update tasks in the context
                setSortedTasks(sorted); // Update local sorted tasks state
            } else {
                setSortedTasks([]); // Clear sorted tasks if no tasks exist
            }

            setLoading(false); // Mark loading as complete
            setIsProcessing(false); // Mark processing as complete

            // Delay rendering of EmptyTasks by 500ms for better UX
            setTimeout(() => setDelayedRender(true), 500);
        };

        processTasks();
    }, [tasks, setTasks]); // Run effect whenever `tasks` or `setTasks` changes

    // Show loader while tasks are being processed
    if (loading || isProcessing) {
        return (
            <div className="flex justify-center items-center mx-auto mt-20">
                <Loader loading={true} size={25} /> {/* Display loading spinner */}
            </div>
        );
    }

    // Render tasks or delayed empty state
    return (
        <div className="flex-grow">
            {sortedTasks.length > 0 ? (
                // Render list of tasks
                <div className="my-5 flex-grow">
                    {sortedTasks.map((task: any) => (
                        <TaskCard
                            key={task.id} // Unique key for each task
                            setTasks={setTasks} // Pass setter for tasks
                            message={task.title} // Task title
                            startIcon="/unchecked.png" // Icon for uncompleted tasks
                            endIcon="/trash.png" // Icon for delete action
                            id={task.id} // Task ID
                            completed={task.completed} // Task completion status
                            setNumber={setTotalCount} // Update total task count
                            setActualCount={setTotalCount} // Update completed task count
                        />
                    ))}
                </div>
            ) : (
                // Render empty tasks state with delayed rendering
                delayedRender && (
                    <EmptyTasks
                        message="You don't have any tasks registered yet." // Message for empty tasks
                        submessage="Create tasks and organize your to-do items." // Submessage for empty tasks
                    />
                )
            )}
        </div>
    );
};
