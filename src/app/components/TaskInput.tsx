import * as React from 'react'; // Import React library
import { TaskInputProps } from '../types'; // Import type definition for TaskInput props

// Component for rendering an input field to enter a task title
export const TaskInput: React.FC<TaskInputProps> = ({ value, onChange }) => (
  <div className="flex flex-col w-full text-sm max-md:max-w-full">
    {/* Label for the input field */}
    <label htmlFor="taskTitle" className="font-bold text-blue-400">
      Title
    </label>
    <input
      id="taskTitle" // ID for the input field, linking it to the label
      type="text" // Input type as text
      value={value} // Current value of the input field
      onChange={(e) => onChange(e.target.value)} // Update the parent state on input change
      placeholder="Ex. Brush your teeth" // Placeholder text to guide the user
      className="flex gap-3 items-start p-4 mt-3 w-full leading-snug rounded-lg border border-solid shadow-sm bg-neutral-800 border-zinc-800 text-zinc-100 max-md:max-w-full"
      // Apply styling for the input field
      aria-label="Task title input" // Accessibility label for screen readers
    />
  </div>
);