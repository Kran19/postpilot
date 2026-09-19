import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs transition-all duration-200 text-gray-900',
        hoverEffect && 'hover:border-gray-300 hover:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
