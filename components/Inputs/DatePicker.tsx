import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage } from './ErrorMessage';

export interface DatePickerProps {
  onChange(date: Date): void;
  value: Date;
  onBlur?(): void;
  label?: string;
  labelId?: string;
  showError?: boolean;
  errorMessage?: string;
}

export const DatePicker = forwardRef<any, DatePickerProps>(
  (
    { onChange, value, label, labelId, errorMessage, showError, onBlur },
    ref
  ) => {
    return (
      <div>
        {label && <label htmlFor={labelId ?? label}>{label}</label>}
        <ReactDatePicker
          className={cn(
            'mt-1 flex h-10 w-full min-w-[180px] rounded-md border border-slate-300 bg-transparent bg-gray-700 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
            ''
          )}
          selected={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <ErrorMessage showError={showError ?? false} message={errorMessage} />
      </div>
    );
  }
);
