import React from "react";

const Input = ({ className = "", type, name, placeholder, value, onChange, icon }) => {
  return (
    <div className={`custom-input ${className}`}>
      <input
        id={`custom-input-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label htmlFor={`custom-input-${name}`} className="floating-label">
        {placeholder}
      </label>
      {icon}
    </div>
  );
};

export default Input;
