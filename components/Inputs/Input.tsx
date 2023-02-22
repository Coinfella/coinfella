import { PropsWithClass } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { memo } from 'react';
import { ErrorMessage } from './ErrorMessage';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any;
  onChange?: (value: any) => void;
  label?: string;
  labelId?: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'number' | 'password';
  endIcon?: React.ReactNode;
  showError?: boolean;
  errorMessage?: string;
  autofocus?: boolean;
}

const Input = memo(
  React.forwardRef<any, PropsWithClass<InputProps>>(
    (
      {
        type = 'text',
        label,
        labelId,
        value,
        showError,
        errorMessage,
        className = '',
        placeholder,
        onChange,
        endIcon,
        ...props
      },
      ref
    ) => {
      if (type === 'text') {
        return (
          <div>
            {label && <label htmlFor={labelId ?? label}>{label}</label>}
            <input
              type="text"
              name={label}
              value={value}
              id={labelId ?? label}
              className={cn(
                'flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
                className
              )}
              placeholder={placeholder}
              {...props}
            />
            {endIcon && <div>{endIcon}</div>}
            <ErrorMessage
              showError={showError ?? false}
              message={errorMessage}
            />
          </div>
        );
      } else if (type === 'number') {
        return (
          <div className="input-container">
            {label && <label htmlFor={labelId ?? label}>{label}</label>}
            <div className="input-wrapper">
              <input
                type="number"
                name={label}
                id={labelId ?? label}
                value={value}
                placeholder={placeholder}
                {...props}
              />
              {endIcon && <div className="input-end-icon">{endIcon}</div>}
            </div>
            <ErrorMessage
              showError={showError ?? false}
              message={errorMessage}
            />
          </div>
        );
      } else if (type === 'textarea') {
        return (
          <div className={`input-wrap ${className}`}>
            {label && <label htmlFor={labelId ?? label}>{label}</label>}
            {/* @ts-ignore */}
            <textarea
              ref={ref}
              autoFocus={props?.autofocus}
              id={labelId ?? label}
              placeholder={placeholder}
              value={value}
              {...props}
            />
            <ErrorMessage
              showError={showError ?? false}
              message={errorMessage}
            />
          </div>
        );
      } else {
        return <>Unknown Input Type</>;
      }
    }
  )
);

Input.displayName = 'Input';
export { Input };