'use client'
import * as React from 'react';
import { TaskCounterProps } from '../types';
import { useState, useEffect } from 'react';
import { useTasks } from '../context/TasksContext';


export const TaskCounter: React.FC<TaskCounterProps> = ({ label, color }) => {
    // const [tasks, setTasks] = useState<any[]>([]);
    const { tasks } = useTasks() as any;
    const [actualCount, setActualCount] = useState<number>(0)
    
    useEffect(() => {  
        const lengthOfArray = tasks?.length;
        // console.log(lengthOfArray)
        // console.log(tasks);
        if( lengthOfArray > 0) {
            setActualCount(lengthOfArray);
            
            if(tasks[0].length === 0) {
                setActualCount(0)    
            }
            
        } else (
            setActualCount(0)
        )
    }, [setActualCount, tasks, actualCount])

    return (
        <div className="flex gap-2 items-center">
            <div className={`self-stretch my-auto text-sm ${color}`}>{label}</div>
            <div className="self-stretch px-2 py-0.5 my-auto text-xs bg-zinc-800 rounded-[999px] text-zinc-300">{actualCount}</div>
        </div>
    )
};