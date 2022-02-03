import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ title, search, onClose }) => {
  return (
    <div className="header flex align-center justify-space-between p-4">
      <span>{title}</span>
      {search}
      <FontAwesomeIcon
        className="exit-button pointer ml-4"
        icon={faTimes}
        size="2x"
        color="white"
        onClick={onClose}
      />
    </div>
  );
};

export default Header;
