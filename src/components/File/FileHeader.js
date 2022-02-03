import React, { useContext, useState } from "react";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilesContext } from "../Context/FilesProvider";
import EditNameInput from "../Input/EditNameInput";
import { FoldersContext } from "../Context/FoldersProvider";

const FileHeader = ({ file = {} }) => {
  const { folders } = useContext(FoldersContext);
  const { files, setFiles } = useContext(FilesContext);

  const [isEdit, setIsEdit] = useState(false);
  const [newFileName, setNewFileName] = useState(file.name);

  const closeFile = () => {
    const newFiles = files.map((fileObj) => {
      fileObj.open = false;
      return fileObj;
    });

    setFiles(newFiles);
  };

  const changeFileName = () => {
    if (isEdit) {
      saveFileName();
    }
    setIsEdit(!isEdit);
  };

  const handleChangeFileName = ({ target: { value } }) => setNewFileName(value);

  const saveFileName = () => {
    let fileName = newFileName;
    const subFiles = folders.filter((folderObj) => folderObj.open)[0].subFiles;
    const temp = files
      .filter((fileObj) => subFiles.includes(fileObj._id))
      .filter((fileObj) => fileObj.name.includes(fileName) && fileObj._id !== file._id);

    if (temp.length > 0) {
      fileName = `${fileName}(${Number(temp[temp.length - 1].name.slice(9, -1)) + 1})`;
    }

    const newFiles = files.map((fileObj) => {
      if (fileObj.name === file.name) {
        fileObj.name = fileName;
      }
      return fileObj;
    });

    setFiles(newFiles);
  };

  return (
    <div className="p-3 flex justify-space-between align-center">
      <div>
        {isEdit ? (
          <EditNameInput
            className="mr-4"
            name="newFileName"
            value={newFileName}
            onChange={handleChangeFileName}
          />
        ) : (
          <span className="mr-4">{file.name}</span>
        )}
        <FontAwesomeIcon
          className="pointer"
          icon={faPencilAlt}
          size="sm"
          color="#d98324"
          onClick={changeFileName}
        />
      </div>
      <FontAwesomeIcon
        className="exit-button pointer ml-4"
        icon={faTimes}
        size="2x"
        color="white"
        onClick={closeFile}
      />
    </div>
  );
};

export default FileHeader;
