import React from 'react';
import { cn } from '@/lib/utils';
import { ChannelType } from '@/lib/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline' | ChannelType;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'sm',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-colors';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-[#EAF5EE] text-[#1E7E34] border-[#D1E8D7]',
    warning: 'bg-[#FEF6EE] text-[#B45309] border-[#FBDDBE]',
    error: 'bg-[#FDF2F2] text-[#DC2626] border-[#F8D7D7]',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    outline: 'border-gray-200 text-gray-700 bg-transparent',
    instagram: 'bg-pink-50 text-pink-700 border-pink-200',
    facebook: 'bg-blue-50 text-blue-700 border-blue-200',
    whatsapp: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    threads: 'bg-gray-900 text-white border-gray-900',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
