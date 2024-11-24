import * as React from 'react';
import { SaveButtonProps } from '../types';

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isDisabled }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="flex flex-wrap gap-2 justify-center items-center p-4 w-full text-sm font-bold leading-snug bg-[#1E6F9F] rounded-lg min-h-[52px] text-zinc-100 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
    >
      <span>Save</span>
      <img
        src="/check_bold.png"
        className="object-contain w-4 aspect-square"
        alt=""
      />
    </button>
  );