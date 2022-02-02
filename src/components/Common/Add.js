import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddFile = ({ text, onClick, className = "" }) => {
  return (
    <button className={`add-button pl-3 pr-3 pt-2 pb-2 ${className}`} onClick={onClick}>
      <FontAwesomeIcon className="pointer mr-2 " icon={faPlus} size="lg" color="white" />
      {text}
    </button>
  );
};

export default AddFile;
