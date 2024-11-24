'use client'
import React, { useState, useEffect } from "react"
import { EmptyTasks } from "./EmptyTask";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TasksContext";


export const Task: React.FC= () => {
    const { tasks, setTasks } = useTasks() as any;
    const [, setNumber] = useState<number>(0);
    const [, setActualCount] = useState<number>(0);
    const [lengthToggle, setLengthToggle] = useState<boolean>(true);
    
    const sortTheData = () => {
        const tasksLength = tasks[0].length;
        const taskSort = tasks[0];
        if(tasksLength > 0) {
            const sortOne = taskSort.sort((a: { createdAt: number; },b: { createdAt: number; }) =>  a.createdAt - b.createdAt).reverse();
            const sortTwo = sortOne.sort((a: { completed: any; },b: { completed: any; }) =>  a.completed - b.completed);
            // console.log('sorted tasks ',tasks);    
            return sortTwo as any[]
        }
    }
    
    useEffect(() => {
        if(tasks?.[0] && tasks[0]?.length > 0){
            const sorted = sortTheData();
            setTasks(() => sorted); 
            setLengthToggle(true);
        }
        if(!tasks?.[0] ){
            setTasks(() => {[]})
            setLengthToggle(false);
        }
    }, [tasks, setTasks])
    
    return (
        <div className="flex-grow">
            {!lengthToggle &&
                <div>
                    <EmptyTasks 
                        message="You don't have any tasks registered yet."
                        submessage="Create tasks and organize your to-do items."
                    />
                </div>
            }
            {tasks && 
                <div className='my-5 flex-grow'>
                    {lengthToggle && (
                        <div>
                            {tasks.map((task: { id: number; title: string; completed: boolean; }, index: React.Key | null | undefined) => (
                                <div key={index}>
                                    <TaskCard key={task.id} setTasks={setTasks} setNumber={setNumber} setActualCount={setActualCount} message={task.title} startIcon={'/unchecked.png'} endIcon={'/trash.png'} id={task.id} completed={task.completed}/>
                                </div>
                            ))}
                        </div>
                    )} 
                </div>
            }
        </div>
    )
}

