import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { FilesContext } from "./Context/FilesProvider.js";
import { FoldersContext } from "./Context/FoldersProvider.js";
import ControlPanel from "./ControlPanel.js";
import Folder from "./Folder/Folder";
import File from "./File/File";

const Desktop = ({}) => {
  const { folders } = useContext(FoldersContext);
  const { files } = useContext(FilesContext);

  return (
    <section className="desktop">
      <img src="/images/mordor.png" className="background" />
      <ControlPanel />
      <div className="viewer">
        {/* Opened folders */}
        {folders &&
          folders.length > 0 &&
          folders.map((folderObj) => folderObj.open && <Folder folder={folderObj} />)}
        {files &&
          files.length > 0 &&
          files.map((fileObj) => fileObj.open && <File file={fileObj} />)}
      </div>
    </section>
  );
};

export default Desktop;
