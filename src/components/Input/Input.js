import React from "react";

const Input = ({ className = "", type, name, placeholder, value, onChange, icon }) => {
  return (
    <div className={`custom-input ${className}`}>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      <span className="floating-label">{placeholder}</span>
      {icon}
    </div>
  );
};

export default Input;
