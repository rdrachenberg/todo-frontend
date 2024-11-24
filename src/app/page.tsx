'use client'
import * as React from 'react';
import { TaskCounter } from './components/TaskCounter';
import { Task } from './components/Tasks';
import { Header } from './components/Header';
import { CompletedCounter } from './components/CompletedCounter';
import { useTasks } from './context/TasksContext';
import { TaskContextType, Tasks } from './types';

export default function Home() {
  
  
  
  return (
      <main className="flex flex-col">
      <div className="flex flex-col flex-grow pb-96 w-full h-[1500px] bg-zinc-900 max-md:pb-24 max-md:max-w-full">
        <Header />
        <section className="flex flex-col self-center mt-24 mb-0 max-w-full font-bold w-[736px] max-md:mt-10 max-md:mb-2.5">
          <div className="flex flex-wrap gap-10 justify-between items-end w-full whitespace-nowrap max-md:max-w-full">
            <TaskCounter label="Tasks"  color="text-blue-400" />
            <CompletedCounter label="Completed" color="text-indigo-400"/>
          </div>
          <div className='flex flex-grow mb-10'>
            <Task />
          </div>
        </section>
      </div>
    </main>
  );
}

