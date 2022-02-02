import React, { useContext, useState } from "react";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Add from "../Common/Add";
import BackButton from "../Common/BackButton";
import EditNameInput from "../Input/EditNameInput";
import { FoldersContext } from "../Context/FoldersProvider";
import { FilesContext } from "../Context/FilesProvider";

const FolderHeader = ({ folder = {} }) => {
  const { folders, setFolders } = useContext(FoldersContext);
  const { files, setFiles } = useContext(FilesContext);

  const [isEdit, setIsEdit] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);

  // close every folder  by assigning value false to open field except for parent folder
  const goBack = () => {
    const newFolders = folders.map((folderObj) => {
      if (folderObj.subFolders.includes(folder._id)) {
        folderObj.open = true;
      } else {
        folderObj.open = false;
      }
      return folderObj;
    });

    setFolders(newFolders);
  };

  // close every folder by assigning value false to open field
  const closeFolder = () => {
    const newFolders = folders.map((folderObj) => {
      if (folderObj.name === folder.name) {
        folderObj.open = false;
      }
      return folderObj;
    });

    setFolders(newFolders);
  };

  // if isEdit is true then we save folder name and than switch the value
  const changeFolderName = () => {
    if (isEdit) {
      saveFolderName();
    }
    setIsEdit(!isEdit);
  };

  const handleChangeFolderName = ({ target: { value } }) => setNewFolderName(value);

  const saveFolderName = () => {
    let folderName = newFolderName;
    const temp = folders.filter(
      (folderObj) => folderObj.name.includes(newFolderName) && folderObj._id !== folder._id
    );

    if (temp.length > 0) {
      folderName = `${folderName}(${Number(temp[temp.length - 1].name.slice(11, -1)) + 1})`;
    }

    const newFolders = folders.map((folderObj) => {
      if (folderObj.name === folder.name) {
        folderObj.name = folderName;
      }
      return folderObj;
    });

    setFolders(newFolders);
  };

  const createFolder = () => {
    const subFolders = folders.filter((folderObj) => folder.subFolders.includes(folderObj._id));
    const temp = subFolders.filter((folderObj) => folderObj.name.includes("New Folder"));

    const model = {
      type: "folder",
      name:
        temp.length > 0
          ? `New Folder(${Number(temp[temp.length - 1].name.slice(11, -1)) + 1})`
          : "New Folder",
      createdOn: new Date(),
      subFolders: [],
      subFiles: [],
      open: false,
      _id: folders[folders.length - 1]._id + 1,
    };

    const newFolders = folders.map((folderObj) => {
      if (folderObj._id === folder._id) {
        folderObj.subFolders.push(model._id);
      }
      return folderObj;
    });

    setFolders([...newFolders, model]);
  };

  const createFile = () => {
    const folderFiles = files.filter((fileObj) => folder.subFiles.includes(fileObj._id));
    const temp = folderFiles.filter((fileObj) => fileObj.name.includes("New File"));

    const model = {
      type: "file",
      name:
        temp.length > 0
          ? `New File(${Number(temp[temp.length - 1].name.slice(9, -1)) + 1})`
          : "New File",
      createdOn: new Date(),
      size: 0,
      open: false,
      content: "",
      _id: files.length ? files[files.length - 1]._id + 1 : 1,
    };

    const newFolders = folders.map((folderObj) => {
      if (folderObj._id === folder._id) {
        folderObj.subFiles.push(model._id);
      }
      return folderObj;
    });

    setFolders(newFolders);
    setFiles([...files, model]);
  };

  return (
    <div className="header p-4 flex justify-space-between align-center">
      <div className="flex justify-space-between align-center">
        <div className="header-controls flex justify-space-between align-center">
          <BackButton onClick={goBack} />
        </div>
        <div className="header-title">
          {isEdit ? (
            <EditNameInput
              className="mr-4"
              name="newFolderName"
              value={newFolderName}
              onChange={handleChangeFolderName}
            />
          ) : (
            <span className="title ml-4 mr-4">{folder.name}</span>
          )}
          {folder._id !== 1 && (
            <FontAwesomeIcon
              className="pointer"
              icon={faPencilAlt}
              size="sm"
              color="#d98324"
              onClick={changeFolderName}
            />
          )}
        </div>
      </div>

      <div className="flex justify-space-between align-center">
        <div className="header-add flex justify-space-between align-center">
          <Add onClick={createFolder} text="Folder" className="mr-4" />
          <Add onClick={createFile} text="File" />
        </div>
        <FontAwesomeIcon
          className="exit-button pointer ml-4"
          icon={faTimes}
          size="2x"
          color="white"
          onClick={closeFolder}
        />
      </div>
    </div>
  );
};

export default FolderHeader;
