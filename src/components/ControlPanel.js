import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faFolderOpen,
  faGlobe,
  faImage,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Common/Button.js";
import { FoldersContext } from "./Context/FoldersProvider.js";

const ControlPanel = () => {
  const { folders, setFolders } = useContext(FoldersContext);

  const openDesktop = () => {
    const newFolders = folders.map((folderObj) => {
      if (folderObj._id === 1) {
        folderObj.open = true;
      }

      return folderObj;
    });

    setFolders(newFolders);
  };

  return (
    <section className="control-panel flex flex-column align-center justify-center">
      <Button
        className="mb-4"
        title="Folders"
        icon={<FontAwesomeIcon icon={faFolderOpen} size="2x" />}
        onClick={openDesktop}
      />
      <Button
        className="mb-4"
        title="Web Browser"
        icon={<FontAwesomeIcon icon={faGlobe} size="2x" />}
      />
      <Button
        className="mb-4"
        title="Web Cam"
        icon={<FontAwesomeIcon icon={faCamera} size="2x" />}
      />
      <Button
        className="mb-4"
        title="Gallery"
        icon={<FontAwesomeIcon icon={faImage} size="2x" />}
      />
      <Button
        className="mb-4"
        title="News"
        icon={<FontAwesomeIcon icon={faNewspaper} size="2x" />}
      />
    </section>
  );
};

export default ControlPanel;
