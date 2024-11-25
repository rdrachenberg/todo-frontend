'use client'; // Using client component for client-side rendering
import * as React from 'react'; // Import React library
import { useEffect } from 'react'; // Import useEffect for side effects
import { ColorButton } from '../../components/ColorButton'; // Import ColorButton component
import { TaskInput } from '../../components/TaskInput'; // Import TaskInput component
import { SaveButton } from '../../components/SaveButton'; // Import SaveButton component
import { Header } from '../../components/Header'; // Import Header component
import Image from 'next/image'; // Import Next.js Image component for optimized images
import { useRouter, useSearchParams } from 'next/navigation'; // Import hooks for navigation and search params
import api from 'src/app/utils/api'; // Import API utility for HTTP requests
import getTask from '../../utils/getTask'; // Import utility to fetch a specific task

// Detail component for viewing and editing task details
const Detail: React.FC = () => {
  const [taskTitle, setTaskTitle] = React.useState(''); // State for task title
  const [selectedColor, setSelectedColor] = React.useState(''); // State for selected color
  const router = useRouter(); // Initialize the router for navigation
  const searchParams = useSearchParams(); // Get search parameters from the URL

  const id = searchParams.get('id'); // Retrieve the task ID from search parameters

  // Function to load task details based on the task ID
  const loadTask = async () => {
    const task = await getTask(id!); // Fetch the task data
    try {
      setTaskTitle(task.title); // Set task title
      setSelectedColor(task.color); // Set task color
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Function to navigate back to the previous page
  const handleBack = () => {
    router.back();
  };

  // Function to handle form submission for updating the task
  const handFormSubmition = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission
    const res = await api.put(`/${id}`, {
      title: taskTitle,
      color: selectedColor,
    }); // Send update request to the API

    if (res.statusText == 'OK') { // Check if the update was successful
      console.log('Updated record for id: ', id);
      window.location.href = "/"; // Redirect to the homepage
    }
  };

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F6',
    '#33FFF6', '#F6FF33', '#FF3333', '#33FF33', '#3333FF',
  ]; // List of color options for the task

  // Load task details when the component mounts
  useEffect(() => {
    loadTask();
  }, []);

  return (
    <main className="flex overflow-hidden flex-col pb-96 bg-zinc-900 max-md:pb-24">
      <Header /> {/* Render the header */}
      <section className="flex flex-col self-center mt-24 max-w-full w-[736px] max-md:mt-10">
        <Image
          width={100}
          height={100}
          src="/left_arrow_icon.png" // Path to the back arrow icon
          className="object-contain w-4 aspect-square"
          alt="" // Empty alt text for decorative image
          onClick={handleBack} // Call handleBack when the image is clicked
        />

        {/* Form to update the task */}
        <form
          className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full"
          onSubmit={handFormSubmition} // Handle form submission
        >
          <TaskInput value={taskTitle} onChange={setTaskTitle} /> {/* Task title input */}

          <div className="flex flex-col self-start mt-6 max-md:max-w-full">
            <label className="text-sm font-bold text-blue-400">Color</label> {/* Color label */}
            <div className="flex flex-wrap gap-4 items-start mt-3 max-md:max-w-full">
              {colors.map((color) => (
                <ColorButton
                  key={color} // Unique key for each color button
                  color={color} // Pass color to the button
                  onClick={() => setSelectedColor(color)} // Set the selected color on click
                />
              ))}
            </div>
          </div>

          <div className="mt-12 max-md:mt-10">
            <SaveButton
              onClick={() => { handFormSubmition; }} // Handle save button click
              isDisabled={!taskTitle || !selectedColor} // Disable button if title or color is empty
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Detail; // Export the Detail component