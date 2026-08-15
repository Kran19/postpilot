import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg select-none';

    const variantStyles = {
      primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 shadow-sm active:scale-[0.98]',
      outline: 'border border-slate-700 hover:bg-slate-800/60 text-slate-200 active:scale-[0.98]',
      ghost: 'text-slate-300 hover:bg-slate-800/50 hover:text-white',
      danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 active:scale-[0.98]',
    };

    const sizeStyles = {
      sm: iconOnly ? 'p-2 text-xs' : 'px-3 py-1.5 text-xs font-medium gap-1.5',
      md: iconOnly ? 'p-2.5 text-sm' : 'px-4 py-2.5 text-sm font-medium gap-2',
      lg: iconOnly ? 'p-3 text-base' : 'px-6 py-3 text-base font-semibold gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
