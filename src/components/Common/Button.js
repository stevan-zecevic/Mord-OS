import React from "react";

const Button = ({ icon, onClick, className = "", title }) => {
  return (
    <button className={`custom-button ${className}`} title={title} onClick={onClick}>
      {icon}
    </button>
  );
};

export default Button;
