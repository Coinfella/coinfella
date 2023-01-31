import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "textarea" | "number" | "password";
  endIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  value,
  endIcon,
  placeholder,
  type,
  label,
}) => {
  if (type === "text") {
    return (
      <div className={styles["input-container"]}>
        <label htmlFor={label}>{label}</label>
        <div className={styles['input-wrapper']}>
          <input
            type="text"
            name={label}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
          {endIcon && <div className="input-end-icon">{endIcon}</div>}
        </div>
      </div>
    );
  }
  if (type === "number") {
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
