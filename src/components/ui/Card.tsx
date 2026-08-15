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
        'bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 shadow-sm transition-all duration-200',
        hoverEffect && 'hover:border-slate-700 hover:shadow-md hover:bg-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
