// Props for the TaskCounter component
export interface TaskCounterProps {
  label: string; // Label for the task counter
  color: string; // Color of the label
}

// Props for the TaskCreateButton component
export interface TaskCreateButtonProps {
  onClick: () => void; // Function to handle button click
}

// Props for the EmptyTasks component
export interface EmptyTasksProps {
  message: string; // Main message to display
  submessage: string; // Sub-message to display
}

// Props for the ColorButton component
export interface ColorButtonProps {
  color: string; // The color value for the button (e.g., hex code)
  onClick: () => void; // The handler function to execute when the button is clicked
  isSelected?: boolean; // Optional: Indicates if this color is currently selected
}


// Props for the TaskInput component
export interface TaskInputProps {
  value: string; // Current value of the input
  onChange: (value: string) => void; // Function to handle input changes
}

// Props for the AddTaskButton component
export interface AddTaskButtonProps {
  onClick: () => void; // Function to handle button click
  isDisabled?: boolean; // Optional flag to disable the button
}

// Props for the SaveButton component
export interface SaveButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Handler function for when the button is clicked
  isDisabled?: boolean; // Optional flag to disable the button
}


// Props for images used in components
export interface ImageProps {
  src: string; // Source of the image
  alt: string; // Alt text for the image
  className?: string; // Optional additional CSS classes
}

// Props for the TaskCard component
export interface TaskCardProps {
  message: string; // Task message or title
  startIcon: string; // Icon for the start of the task card
  endIcon: string; // Icon for the end of the task card
  id: number; // Unique identifier for the task
  completed: boolean; // Flag to indicate if the task is completed
  setTasks: any; // Function to update tasks
  setNumber: any; // Function to update task-related number
  setActualCount: any; // Function to update the actual task count
}

// Context type for managing tasks
export interface TaskContextType {
  tasks: Tasks[]; // Array of tasks
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>; // Function to update the tasks
  totalCount: number | null; // Array.length to hold number of tasks
  setTotalCount: React.Dispatch<React.SetStateAction<number>>; // Function to update the tasks
  
}

// Structure of a task object
export interface Tasks {
      id: number;
      title: string; // Title of the task
      color: string; // Color associated with the task
      completed: boolean; // Flag to indicate if the task is completed
  
}

export interface LoaderProps {
  loading: boolean; // Whether the loader should be displayed
  size?: number; // Size of the loader (width and height)
  color?: string; // Color of the loader
}
