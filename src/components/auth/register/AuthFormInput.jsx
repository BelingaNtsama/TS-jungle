// components/AuthFormInput.jsx
import React from 'react';

const AuthFormInput = ({ 
  label, 
  name, 
  type, 
  placeholder, 
  value, 
  error, 
  onChange, 
  icon,
  className = '',
  inputClassName = ''
}) => (
  <div className={`form-control ${className}`}>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <label className={`input-group ${error ? "input-error" : ""}`}>
      {icon && <span className="bg-base-200">{icon}</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error ? "input-error" : ""} ${inputClassName}`}
        value={value}
        onChange={onChange}
      />
    </label>
    {error && <span className="text-error text-xs mt-1">{error}</span>}
  </div>
);

export default AuthFormInput;