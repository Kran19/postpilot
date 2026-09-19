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
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-xl select-none';

    const variantStyles = {
      primary: 'bg-[#18181B] hover:bg-black text-white shadow-xs active:scale-[0.98]',
      secondary: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200/80 shadow-2xs active:scale-[0.98]',
      outline: 'border border-gray-200/80 hover:bg-gray-50 text-gray-700 active:scale-[0.98]',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs active:scale-[0.98]',
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
