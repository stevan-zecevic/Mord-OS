import React from "react";

const FilterInput = ({ className = "", name, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Folder name..."
      className={` filter-input ${className}`}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default FilterInput;
