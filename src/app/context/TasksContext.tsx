'use client'
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { TaskContextType } from "../types";
import { getContextData } from "../utils/getContextData";

const TaskContext = createContext<TaskContextType | null >(null);


export const TasksProvider = ({ children }: {children: React.ReactNode}) => {
    const [tasks, setTasks] = useState<any>([]);
    
    useEffect(() => {
       const data = getContextData().then((tasksData) => {
            setTasks([...tasks, tasksData]);
            // console.log(tasksData);
            return tasksData
       });
    //    console.log(data) 
    //    console.log(tasks)
    }, [])
    
    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            { children }
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext);
    
    if(!context) {
        console.log('Errors in the context');
    }

    if(context !== null) {
        return context
    }
}