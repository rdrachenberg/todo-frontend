'use client'
import * as React from 'react';
import { TaskCounterProps } from '../types';
import { useState, useEffect } from 'react';
import { useTasks } from '../context/TasksContext';


export const CompletedCounter: React.FC<TaskCounterProps> = ({ label, color }) => {
    const { tasks } = useTasks() as any;
    const [completedCount, setCompletedCount] = useState<number>(0)
    const tempTasks = tasks;

    const getCompleted = () => {
        let counter = 0;
        for(const completed in tempTasks) {
            const value = tempTasks[completed].completed;
            // console.log(value)
            if(value == true) {
                counter++;
            }
        }
        // console.log('counter here ', counter)
        return counter
    }

    useEffect(() => {
        if(tempTasks?.length > 0) {
            const count = getCompleted();
            setCompletedCount(() => count)
        }
      
      
    }, [setCompletedCount, tempTasks])

    return (
        <div className="flex gap-2 items-center">
            <div className={`self-stretch my-auto text-sm ${color}`}>{label}</div>
            <div className="self-stretch px-2 py-0.5 my-auto text-xs bg-zinc-800 rounded-[999px] text-zinc-300">{completedCount}</div>
        </div>
    )
};