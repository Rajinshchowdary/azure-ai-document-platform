import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Static mapping to avoid Tailwind v4 compiler issues
  const variantStyles = {
    primary: 'bg-primary-600 text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:bg-primary-500 border border-primary-700 focus:ring-primary-500/50',
    secondary: 'bg-surface-800 text-text-primary border border-white/10 hover:bg-surface-700 hover:border-white/20 focus:ring-surface-700/50',
    danger: 'bg-error-600/90 text-white border border-error-700 hover:bg-error-500 focus:ring-error-500/50 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)]',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-800 focus:ring-surface-700/50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg 
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-950
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
