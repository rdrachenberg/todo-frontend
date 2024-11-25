import * as React from 'react'; // Import React library
import { AddTaskButtonProps } from '../types'; // Import the type definition for button props

// Component for rendering a button to add a task
export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick, isDisabled }) => (
  <button
    type="submit" // Set button type as submit for form submissions
    onClick={onClick} // Attach the click handler passed via props
    disabled={isDisabled} // Disable the button if isDisabled is true
    className="flex flex-wrap gap-2 justify-center items-center p-4 w-full text-sm font-bold leading-snug bg-[#1E6F9F] rounded-lg min-h-[52px] text-zinc-100 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
    // Apply styling for button appearance and interactivity
  >
    <span>Add Task</span> {/* Button label */}
    <img
      src="/plus.png"
      className="object-contain w-4 aspect-square" // Styling for the image
      alt="" // Provide an empty alt attribute as the image is decorative
    />
  </button>
);
