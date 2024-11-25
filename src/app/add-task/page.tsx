'use client';
import * as React from 'react'; // Import React library
import { ColorButton } from '../components/ColorButton'; // Import the ColorButton component
import { TaskInput } from '../components/TaskInput'; // Import the TaskInput component
import { AddTaskButton } from '../components/AddTaskButton'; // Import the AddTaskButton component
import { Header } from '../components/Header'; // Import the Header component
import { useRouter } from 'next/navigation'; // Import useRouter for navigation in Next.js
import Image from 'next/image'; // Import Image component from Next.js for optimized images
import api from '../utils/api'; // Import the API utility for making HTTP requests

const AddTask: React.FC = () => {
  // State to store the task title
  const [taskTitle, setTaskTitle] = React.useState('');

  // State to store the selected color
  const [selectedColor, setSelectedColor] = React.useState('');

  const router = useRouter(); // Initialize the router for navigation

  // Function to navigate back to the previous page
  const handleBack = () => {
    router.back();
  };

  // Function to handle form submission for adding a new task
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('clicked handle form');

    const res = await api.post('/', { // Make a POST request to create a new task
      title: taskTitle,
      color: selectedColor
    });

    console.log(res);

    if (res.statusText === 'Created') {
      window.location.href = "/"; // Redirect to the homepage upon successful creation
    }
  };

  // Array of color options for tasks
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F6',
    '#33FFF6', '#F6FF33', '#FF3333', '#33FF33', '#3333FF'
  ];

  return (
    <main className="flex overflow-hidden flex-col pb-96 bg-zinc-900 max-md:pb-24">
      <Header /> {/* Render the Header component */}
      <section className="flex flex-col self-center mt-24 max-w-full w-[736px] max-md:mt-10">
        <Image
          width={100}
          height={100}
          src="/left_arrow_icon.png" // Back navigation arrow icon
          className="object-contain w-4 aspect-square"
          alt="" // Provide an empty alt for decorative image
          onClick={handleBack} // Call handleBack on click
        />
        
        <form 
          className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full" 
          onSubmit={handleForm} // Handle form submission
        >
          <TaskInput value={taskTitle} onChange={setTaskTitle} /> {/* Task title input field */}
          <div className="flex flex-col self-start mt-6 max-md:max-w-full">
            <label className="text-sm font-bold text-blue-400">Color</label> {/* Label for color selection */}
            <div className="flex flex-wrap gap-4 items-start mt-3 max-md:max-w-full">
              {colors.map((color) => (
                <button
                  key={color} // Unique key for each color
                  type="button" // Set button type to button
                  onClick={() => setSelectedColor(color)} // Set the selected color on click
                  className="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: color }} // Apply the background color
                  aria-label={`Select ${color} color`} // Accessibility label
                  value={`${color}`} // Set button value to the color
                />
              ))}
            </div>
          </div>
          <div className="mt-12 max-md:mt-10">
            <AddTaskButton
              onClick={() => handleForm} // Bind the form handler
              isDisabled={!taskTitle || !selectedColor} // Disable button if inputs are invalid
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddTask; // Export the AddTask component
