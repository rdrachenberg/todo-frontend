'use client'; // Using client component for client-side rendering
import * as React from 'react'; // Import React library
import { TaskCounter } from './components/TaskCounter'; // Import TaskCounter component
import { Task } from './components/Tasks'; // Import Task component
import { Header } from './components/Header'; // Import Header component
import { CompletedCounter } from './components/CompletedCounter'; // Import CompletedCounter component

// Home component representing the main page of the application
export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Main container for the page layout */}
      <div className="flex flex-col flex-grow pb-96 w-full h-[1500px] bg-zinc-900 max-md:pb-24 max-md:max-w-full">
        <Header /> {/* Render the header component */}
        
        <section className="flex flex-col self-center mt-24 mb-0 max-w-full font-bold w-[736px] max-md:mt-10 max-md:mb-2.5">
          {/* Section containing task counters */}
          <div className="flex flex-wrap gap-10 justify-between items-end w-full whitespace-nowrap max-md:max-w-full">
            <TaskCounter label="Tasks" color="text-blue-400" /> {/* Counter for total tasks */}
            <CompletedCounter label="Completed" color="text-indigo-400" /> {/* Counter for completed tasks */}
          </div>
          
          {/* Section for the task list */}
          <div className='flex flex-grow mb-10'>
            <Task /> {/* Render the list of tasks */}
          </div>
        </section>
      </div>
    </main>
  );
}