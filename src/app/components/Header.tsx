'use client'; // Using client component for client-side rendering
import Image from 'next/image'; // Import the Image component from Next.js for optimized images
import { TaskCreateButton } from '../components/TaskCreateButton'; // Import the TaskCreateButton component
import { usePathname } from 'next/navigation'; // Import usePathname hook for accessing the current route
import { useEffect, useState } from 'react'; // Import React hooks for state and effects
import { useRouter } from 'next/navigation'; // Import useRouter hook for navigation

// Header component for the application
export const Header = () => {
    const [url, setUrl] = useState<string>(''); // State to store the current URL path
    const router = useRouter(); // Initialize the router for navigation
    const pathname = usePathname(); // Get the current route path

    // Function to handle navigation to the add-task page
    const handleCreateTask = () => {
        router.push('/add-task'); // Navigate to the '/add-task' route
    };

    // Effect to update the URL state whenever the pathname changes
    useEffect(() => {
        setUrl(`${pathname}`); // Set the current pathname in the URL state
    }, [pathname, url]); // Dependencies to re-run the effect

    return (
        <header className="flex flex-col items-center px-20 pt-20 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
          {/* Container for the logo and title */}
          <div className="flex z-10 flex-col mb-0 max-w-full w-[736px] max-md:mb-2.5">
            <div className="flex gap-3 self-center ml-12 max-w-full text-4xl font-black text-yellow-600 w-[226px]">
              <Image 
                width={200} 
                height={200} 
                src='/rocket.png' // Path to the rocket image
                className='object-contain shrink-0 self-start mt-1.5 aspect-[0.61] w-[22px]' 
                alt='rocket' // Alt text for the image
              />
              <h1 className="grow shrink w-[188px]">
                <span className="text-[#4EA8DE]">Todo </span> {/* Primary part of the title */}
                <span className="text-[#5E60CE]">App</span> {/* Secondary part of the title */}
              </h1>
            </div>
            {/* Display the create task button only on the homepage */}
            <div className="flex gap-2 items-center mt-14 text-sm font-bold leading-snug text-zinc-100 max-md:mt-10">
             {pathname == '/' ? (
                <TaskCreateButton onClick={handleCreateTask} /> // Render the create task button
             ) : (
                <div></div> // Render an empty div if not on the homepage
             )}
            </div>
          </div>
        </header>
    );
};
