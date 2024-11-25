'use client'; // Using client component for client-side rendering
import { ImageProps, TaskCardProps } from '../types'; // Import type definitions for props
import Image from 'next/image'; // Import Next.js Image component
import { useState } from 'react'; // Import React hook for managing state
import api from '../utils/api'; // Import API utility for HTTP requests
import { useRouter, useSearchParams } from 'next/navigation'; // Import hooks for navigation and URL search parameters
import Modal from './Modal'; // Import Modal component

// Component to display an image with specific props
const NotificationImage: React.FC<ImageProps> = ({ src, alt, className }) => (
    <Image
        width={24} // Set the width of the image
        height={24} // Set the height of the image
        loading="lazy" // Lazy-load the image
        src={src} // Source of the image
        alt={alt} // Alt text for the image
        className={`object-contain shrink-0 w-[24px] aspect-square ${className || ''}`} // Apply default and additional styles
    />
);

// TaskCard component to display an individual task
const TaskCard: React.FC<TaskCardProps> = ({ message, startIcon, endIcon, id, completed }) => {
    const [isChecked, setIsChecked] = useState<boolean>(completed); // State to track if the task is completed
    const [show, setShow] = useState<boolean>(false); // State to control the visibility of the modal
    const searchParams = useSearchParams(); // Access current URL search parameters
    const router = useRouter(); // Initialize the router for navigation

    // Function to toggle the modal visibility
    const handleModalToggle = () => {
        setShow(!show);
    };

    // Function to toggle the completion status of a task
    const handleCheckClick = async () => {
        setIsChecked(!isChecked); // Update local state
        console.log('id: ', id);
        const res = await api.put(`/${id}`, { completed: !completed }); // Send update request to the server
        console.log(res);
        if (res.statusText === "OK") { // Confirm the update was successful
            console.log('Record updated successfully');
            router.refresh(); // Refresh the page
            window.location.replace('/'); // Redirect to the homepage
        }
    };

    // Function to handle task deletion
    const handleDeleteClick = async () => {
        console.log('Delete was clicked. Need to open modal for DELETE');
        router.push(`/?id=${id}&show=true`); // Update the URL to include query params for the modal
        setShow(true); // Display the modal
    };

    return (
        <div>
            {/* Render the task as incomplete or completed based on isChecked */}
            {!isChecked ? (
                <section className="flex text-sm leading-5 text-zinc-100" role="alert">
                    <article className="flex flex-wrap gap-3 items-start p-4 h-full rounded-lg border border-solid shadow-sm bg-neutral-800 border-zinc-800 w-[736px] max-md:max-w-full">
                        <div onClick={handleCheckClick}>
                            <NotificationImage
                                src={startIcon}
                                alt="Notification start icon"
                            />
                        </div>
                        <div className='flex-1 shrink basis-0 max-md:max-w-full' onClick={() => router.push(`/detail/${id}?id=${id}`)}>
                            <p className="flex-1 shrink basis-0">
                                {message}
                            </p>
                        </div>
                        <div className='hover:bg-red-700 rounded-full' onClick={handleDeleteClick}>
                            <NotificationImage
                                src={endIcon}
                                alt="Notification action"
                            />
                        </div>
                    </article>
                </section>
            ) : (
                <section
                    role="alert"
                    aria-live="polite"
                    className="flex text-sm leading-5 text-zinc-500"
                >
                    <article className="flex flex-wrap gap-3 items-start p-4 h-full rounded-lg border border-solid bg-neutral-800 border-neutral-800 w-[736px] max-md:max-w-full">
                        <div onClick={handleCheckClick}>
                            <NotificationImage
                                src={'/checked.png'}
                                alt="Notification start indicator"
                                className='w-6 outline outline-4 -outline-offset-4 outline-violet-600 rounded-full'
                            />
                        </div>
                        <p className={`flex-1 shrink basis-0 max-md:max-w-full ${isChecked ? "line-through" : ''}`}>
                            {message}
                        </p>
                        <div className='hover:bg-red-700 rounded-full' onClick={handleDeleteClick}>
                            <NotificationImage
                                src={endIcon}
                                alt="Notification action"
                            />
                        </div>
                    </article>
                </section>
            )}
            {/* Display the modal if the show state is true */}
            <div>
                {show && <Modal handleModalToggle={handleModalToggle} />}
            </div>
        </div>
    );
};

export default TaskCard; // Export the TaskCard component
