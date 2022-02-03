import React from "react";
import FolderHeader from "./FolderHeader";
import FolderBody from "./FolderBody";

const Folder = ({ folder = {} }) => {
  return (
    <section className="folder window overflow-auto">
      <FolderHeader folder={folder} />
      <FolderBody folder={folder} />
    </section>
  );
};

export default Folder;
