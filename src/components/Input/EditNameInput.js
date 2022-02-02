import React from "react";

const EditNameInput = ({ size = "10", className, name, value, onChange }) => {
  return (
    <input
      size={size}
      className="editName-input mr-4 pb-1"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default EditNameInput;
