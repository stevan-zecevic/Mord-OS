import React, { useContext, useState } from "react";
import { FilesContext } from "./Context/FilesProvider";
import { FoldersContext } from "./Context/FoldersProvider";
import ControlPanel from "./ControlPanel";
import Folder from "./Folder/Folder";
import File from "./File/File";
import Browser from "./Browser";
import Camera from "./Camera";
import Gallery from "./Gallery";
import News from "./News";

const Desktop = ({}) => {
  const { folders } = useContext(FoldersContext);
  const { files } = useContext(FilesContext);

  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const toggleBrowser = () => setIsBrowserOpen(!isBrowserOpen);
  const toggleCamera = () => setIsCameraOpen(!isCameraOpen);
  const toggleGallery = () => setIsGalleryOpen(!isGalleryOpen);
  const toggleNews = () => setIsNewsOpen(!isNewsOpen);

  return (
    <section className="desktop">
      <img src="/images/mordor.png" className="background" />
      <ControlPanel
        toggleBrowser={toggleBrowser}
        toggleCamera={toggleCamera}
        toggleGallery={toggleGallery}
        toggleNews={toggleNews}
      />
      <div className="viewer">
        {/* Check what is opened and show it in this order */}
        {folders &&
          folders.length > 0 &&
          folders.map((folderObj) => folderObj.open && <Folder folder={folderObj} />)}
        {files &&
          files.length > 0 &&
          files.map((fileObj) => fileObj.open && <File file={fileObj} />)}
        {isBrowserOpen && <Browser toggleBrowser={toggleBrowser} />}
        {isCameraOpen && <Camera toggleCamera={toggleCamera} />}
        {isGalleryOpen && <Gallery toggleGallery={toggleGallery} />}
        {isNewsOpen && <News toggleNews={toggleNews} />}
      </div>
    </section>
  );
};

export default Desktop;
