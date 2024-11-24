export interface TaskCounterProps {
    label: string;
    color: string;
  }
  
  export interface TaskCreateButtonProps {
    onClick: () => void;
  }
  
  export interface EmptyTasksProps {
    message: string;
    submessage: string;
  }

  export interface ColorButtonProps {
    color: string;
    onClick: () => void;
  }
  
  export interface TaskInputProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export interface AddTaskButtonProps {
    onClick: () => void;
    isDisabled?: boolean;
  }  
  
  export interface SaveButtonProps {
    onClick: () => void;
    isDisabled?: boolean;
  }

  export interface ImageProps {
    src: string;
    alt: string;
    className?: string;
  }

  export interface TaskCardProps {
    message: string;
    startIcon: string;
    endIcon: string;
    id: number;
    completed: boolean;
    setTasks: any;
    setNumber: any;
    setActualCount: any;
    
  }

  export interface TaskContextType {
    tasks: Tasks[];
    setTasks: (event:React.ChangeEvent) => void;
  }

  export interface Tasks {
    data: {
      title: string,
      color: string,
      completed: boolean,
    }
  }