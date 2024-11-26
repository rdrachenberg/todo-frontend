import * as React from 'react'; // Import React library
import { SaveButtonProps } from '../types'; // Import the type definition for SaveButton props

// Component for rendering a Save button
export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isDisabled }) => (
    <button
      onClick={onClick} // Attach the click handler passed via props
      disabled={isDisabled} // Disable the button if isDisabled is true
      className="flex flex-wrap gap-2 justify-center items-center p-4 w-full text-sm font-bold leading-snug bg-[#1E6F9F] rounded-lg min-h-[52px] text-zinc-100 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
      // Tailwind styling 
    >
      <span>Save</span> {/* Button label */}
      <img
        src="/check_bold.png" // Path to the check icon
        className="object-contain w-4 aspect-square" // Styling for the icon
        alt="check mark" // Provide an empty alt attribute for decorative image
      />
    </button>
);