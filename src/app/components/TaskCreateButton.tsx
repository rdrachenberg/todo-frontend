import * as React from 'react';
import { TaskCreateButtonProps } from '../types';
import Image from 'next/image';

export const TaskCreateButton: React.FC<TaskCreateButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-wrap flex-1 shrink gap-2 justify-center items-center self-stretch p-4 my-auto w-full bg-[#1E6F9F] rounded-lg basis-0 min-w-[240px] max-md:max-w-full"
    aria-label="Create new task"
  >
    <span className="self-stretch my-auto text-sm font-bold leading-snug text-zinc-100">
      Create Task
    </span>
     <Image 
        width={22}
        height={22}
      src="/plus.png" 
      alt="add task"
      className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" 
    />
  </button>
);