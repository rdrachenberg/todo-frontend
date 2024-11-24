import * as React from 'react';
import { EmptyTasksProps } from '../types';
import Image from 'next/image';

export const EmptyTasks: React.FC<EmptyTasksProps> = ({ message, submessage }) => (
  <section className="flex flex-col justify-center px-6 py-16 mt-6 w-full text-base leading-6 text-center rounded-lg border-t border-solid border-t-zinc-800 text-zinc-500 max-md:px-5 max-md:max-w-full">
    <Image 
      width={22}
      height={22}
      src="/clipboard.png" 
      alt=""
      className="object-contain self-center w-14 aspect-square" 
    />
    <p className="mt-4 max-md:max-w-full">
      {message}
      <br />
      <span className="text-zinc-500">{submessage}</span>
    </p>
  </section>
);