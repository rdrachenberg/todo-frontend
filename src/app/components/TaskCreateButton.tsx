import * as React from 'react'; // Import React library
import { TaskCreateButtonProps } from '../types'; // Import type definition for TaskCreateButton props
import Image from 'next/image'; // Import Next.js Image component for optimized images

// Component for rendering a button to create a new task
export const TaskCreateButton: React.FC<TaskCreateButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick} // Attach the click handler passed via props
    className="flex flex-wrap flex-1 shrink gap-2 justify-center items-center self-stretch p-4 my-auto w-full bg-[#1E6F9F] rounded-lg basis-0 min-w-[240px] max-md:max-w-full"
    // Apply styling for button layout, responsiveness, and appearance
    aria-label="Create new task" // Accessibility label for screen readers
  >
    <span className="self-stretch my-auto text-sm font-bold leading-snug text-zinc-100">
      Create Task {/* Button label */}
    </span>
    <Image 
      width={22} // Set the width of the image **required for nextjs component** 
      height={22} // Set the height of the image **required for nextjs component**
      src="/plus.png" // Path to the plus icon for adding tasks **required for nextjs component**
      alt="add task" // Alt text for the image
      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" 
      // Styling for the image layout and responsiveness
    />
  </button>
);
