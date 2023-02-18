import React from 'react';
import styles from './input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'number' | 'password';
  endIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  endIcon,
  placeholder,
  type,
  label,
}) => {
  if (type === 'text') {
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type="text"
          name={label}
          value={value}
          className={"flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {endIcon && <div>{endIcon}</div>}
      </div>
    );
  }
  if (type === 'number') {
    return (
      <div className="input-container">
        <label htmlFor={label}>{label}</label>
        <div className="input-wrapper">
          <input
            type="number"
            name={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          {endIcon && <div className="input-end-icon">{endIcon}</div>}
        </div>
      </div>
    );
  }
  return <>Unknown input type</>;
};

Input.displayName = 'Input';
export { Input };
