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
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    outline: 'border-slate-700 text-slate-300 bg-transparent',
    instagram: 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 text-pink-300 border-pink-500/30',
    facebook: 'bg-blue-600/15 text-blue-400 border-blue-500/30',
    whatsapp: 'bg-emerald-600/15 text-emerald-300 border-emerald-500/30',
    threads: 'bg-slate-700/50 text-slate-200 border-slate-600',
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
