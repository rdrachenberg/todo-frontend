import * as React from 'react';
import { ColorButtonProps } from '../types';

export const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => {
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2"
      style={{ backgroundColor: color }}
      aria-label={`Select ${color} color`}
      value={`${color}`}
    />
)};