'use client'; // Using client component for client-side rendering
import { createContext, useContext, useEffect, useState } from "react"; // Import React hooks for context, state, and effects
import React from "react"; 
import { TaskContextType } from "../types"; // Import type definition for TaskContext
import { getContextData } from "../utils/getContextData"; // Import utility function to fetch task data

// Create a context for managing tasks with a default value of null
const TaskContext = createContext<TaskContextType | null >(null);

// Provider component to supply tasks and their setter function to the application
export const TasksProvider = ({ children }: {children: React.ReactNode}) => {
    const [tasks, setTasks] = useState<any>([]); // State to hold the list of tasks
    
    useEffect(() => {
        // Fetch task data and update the state
       const data = getContextData().then((tasksData) => {
            setTasks([...tasks, tasksData]); // Append the fetched data to the current tasks
            return tasksData // Return the fetched data
       });
    }, []) // Effect runs only once after the component mounts
    
    return (
        // Provide tasks and setTasks function to the context consumers
        <TaskContext.Provider value={{tasks, setTasks}}>
            { children }
        </TaskContext.Provider>
    )
}

// Custom hook to consume the TaskContext
export const useTasks = () => {
    const context = useContext(TaskContext); // Access the context value
    
    if(!context) {
        console.log('Errors in the context'); // Log error if the context is unavailable
    }

    if(context !== null) {
        return context // Return the context if it exists
    }
}