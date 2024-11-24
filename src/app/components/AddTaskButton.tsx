import * as React from 'react';
import { AddTaskButtonProps } from '../types';

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick, isDisabled }) => (
  <button
    type='submit'
    onClick={onClick}
    disabled={isDisabled}
    className="flex flex-wrap gap-2 justify-center items-center p-4 w-full text-sm font-bold leading-snug bg-[#1E6F9F] rounded-lg min-h-[52px] text-zinc-100 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
  >
    <span>Add Task</span>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/841a040eac34c8ccf6fdd3b6de9fa2bba954800758f07f5595b0d66373db512c?placeholderIfAbsent=true&apiKey=cb0a255344f2402c9ac6e2cf442f0e78"
      className="object-contain w-4 aspect-square"
      alt=""
    />
  </button>
);