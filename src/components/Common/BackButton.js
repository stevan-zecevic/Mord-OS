import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackButton = ({ onClick }) => {
  return (
    <div
      className="folder-control-button p-2 mr-2 pointer flex align-center justify-center"
      onClick={onClick}
    >
      <FontAwesomeIcon className="pointer" icon={faArrowLeft} size="lg" color="white" />
    </div>
  );
};

export default BackButton;
