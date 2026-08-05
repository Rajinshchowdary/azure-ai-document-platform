import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Using strict static strings so Tailwind parses perfectly
  const paddingClass = icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5';
  const errorClass = error ? 'border-error-500/50 focus:border-error-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,1)]' : '';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-text-muted pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full enterprise-input text-sm placeholder:text-text-muted
            ${paddingClass}
            ${errorClass}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error-500 mt-0.5">{error}</p>}
    </div>
  );
}
