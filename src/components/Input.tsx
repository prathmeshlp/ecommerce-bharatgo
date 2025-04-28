import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ariaLabel: string;
  required?: boolean;
  min?: number;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = '',
  ariaLabel,
  required = false,
  min,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-base ${className}`}
      aria-label={ariaLabel}
      required={required}
      min={min}
    />
  );
};

export default React.memo(Input);