import * as React from 'react'; // Import React library
import { ColorButtonProps } from '../types'; // Import the type definition for button props

// Component for rendering a button to select a color
export const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => {
  return (
    <button
      type="button" // Set the button type as 'button' to prevent form submission
      onClick={onClick} // Attach the click handler passed via props
      className="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2"
      // Styling for button size, shape, and focus behavior
      style={{ backgroundColor: color }} // Dynamically set the button's background color
      aria-label={`Select ${color} color`} // Accessibility label for screen readers
      value={`${color}`} // Set the value of the button to the color
    />
  );
};
