import * as React from 'react'; // Import React library
import { EmptyTasksProps } from '../types'; // Import the type definition for empty tasks props
import Image from 'next/image'; // Import Image component from Next.js for optimized images

// Component to display a message when there are no tasks
export const EmptyTasks: React.FC<EmptyTasksProps> = ({ message, submessage }) => (
  <section className="flex flex-col justify-center px-6 py-16 mt-6 w-full text-base leading-6 text-center rounded-lg border-t border-solid border-t-zinc-800 text-zinc-500 max-md:px-5 max-md:max-w-full">
    <Image 
      width={22} // Set the width of the image *required for next Image component*
      height={22} // Set the height of the image *required for next Image component*
      src="/clipboard.png" // Path to the image file *required for next Image component*
      alt="clipboard" // Empty alt attribute for decorative image
      className="object-contain self-center w-14 aspect-square" // Styling for the image
    />
    <p className="mt-4 max-md:max-w-full">
      {message} {/* Display the main message */}
      <br />
      <span className="text-zinc-500">{submessage}</span> {/* Display the submessage */}
    </p>
  </section>
);
