import * as React from 'react';
import { TaskInputProps } from '../types';

export const TaskInput: React.FC<TaskInputProps> = ({ value, onChange }) => (
  <div className="flex flex-col w-full text-sm max-md:max-w-full">
    <label htmlFor="taskTitle" className="font-bold text-blue-400">Title</label>
    <input
      id="taskTitle"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ex. Brush your teeth"
      className="flex gap-3 items-start p-4 mt-3 w-full leading-snug rounded-lg border border-solid shadow-sm bg-neutral-800 border-zinc-800 text-zinc-100 max-md:max-w-full"
      aria-label="Task title input"
    />
  </div>
);