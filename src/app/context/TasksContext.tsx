'use client'; // Using client component for client-side rendering
import { createContext, useContext, useEffect, useState } from "react"; // Import React hooks for context, state, and effects
import React from "react"; 
import { TaskContextType } from "../types"; // Import type definition for TaskContext
import { getContextData } from "../utils/getContextData"; // Import utility function to fetch task data

// Create a context for managing tasks with a default value of null
const TaskContext = createContext<TaskContextType | null>(null);

// Provider component to supply tasks and their setter function to the application
export const TasksProvider = ({ children }: {children: React.ReactNode}) => {
    const [tasks, setTasks] = useState<any[]>([]); // State to hold the list of tasks
    const [totalCount, setTotalCount] = useState<number>(0); // State to hold the total number of tasks
    
    const data = async () => {
        try {
            const tasksData = await getContextData(); // Fetch task data
            //console.log("Raw tasksData:", tasksData); // Log the raw response
    
            // Check if tasksData is an array (it's expected to be an array)
            if (!Array.isArray(tasksData)) {
                console.error("Expected an array, but received:", tasksData);
                return;
            }
    
            // console.log("Processed tasksDataArray:", tasksData); // Log the array we are about to use
    
            // Append fetched data to the previous tasks state
             // Append fetched data to the previous tasks state (ensure prevTasks is an array)
             setTasks((prevTasks) => [
                ...(Array.isArray(prevTasks) ? prevTasks : []), // Ensure prevTasks is an array
                ...tasksData
            ]);
    
            // Update the total count
            setTotalCount((prevCount) => prevCount + tasksData.length);
    
        } catch (error) {
            if(error instanceof Error) {
                console.error("Error fetching task data:", error.message); // Log any errors during fetching
            }
        }
    };
    

    useEffect(() => {
        data(); // Fetch task data on mount
    }, []); // Empty dependency array ensures this runs only once

    return (
        <TaskContext.Provider value={{ tasks, setTasks, totalCount, setTotalCount }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook to consume the TaskContext
export const useTasks = () => {
    const context = useContext(TaskContext); // Access the context value
    
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider'); // Throw error if context is not available
    }

    return context; // Return the context value if available
};
