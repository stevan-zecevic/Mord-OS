import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faFolderOpen,
  faGlobe,
  faImage,
  faNewspaper,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Common/Button";
import { FoldersContext } from "./Context/FoldersProvider";
import { AuthContext } from "./Context/AuthProvider";
const ControlPanel = ({
  toggleBrowser = () => {},
  toggleCamera = () => {},
  toggleGallery = () => {},
  toggleNews = () => {},
}) => {
  const { folders, setFolders } = useContext(FoldersContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  const openDesktop = () => {
    const newFolders = folders.map((folderObj) => {
      if (folderObj._id === 1) {
        folderObj.open = true;
      }

      return folderObj;
    });

    setFolders(newFolders);
  };

  const logout = () => setIsAuthenticated(false);

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
        onClick={toggleBrowser}
      />
      <Button
        className="mb-4"
        title="Web Cam"
        icon={<FontAwesomeIcon icon={faCamera} size="2x" />}
        onClick={toggleCamera}
      />
      <Button
        className="mb-4"
        title="Gallery"
        icon={<FontAwesomeIcon icon={faImage} size="2x" />}
        onClick={toggleGallery}
      />
      <Button
        className="mb-4"
        title="News"
        icon={<FontAwesomeIcon icon={faNewspaper} size="2x" />}
        onClick={toggleNews}
      />
      <Button
        className="mb-4"
        title="Log Out"
        icon={<FontAwesomeIcon icon={faSignOutAlt} size="2x" />}
        onClick={logout}
      />
    </section>
  );
};

export default ControlPanel;
