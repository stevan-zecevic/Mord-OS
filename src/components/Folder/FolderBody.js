import React, { useContext, useState } from "react";
import { FoldersContext } from "../Context/FoldersProvider";
import { FilesContext } from "../Context/FilesProvider";
import {
  faFileWord,
  faFolder,
  faSort,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react/cjs/react.development";

const FolderBody = ({ folder }) => {
  const { folders, setFolders } = useContext(FoldersContext);
  const { files, setFiles } = useContext(FilesContext);

  const [tableData, setTableData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (folder._id) {
      formTableData();
    }
  }, [folder, folders, files]);

  const formTableData = () => {
    const tableData = [];
    folder.subFolders.forEach((subFolder) => {
      let obj = folders.filter((folderObj) => folderObj._id === subFolder)[0];
      tableData.push(obj);
    });

    folder.subFiles.forEach((subFile) => {
      let obj = files.filter((fileObj) => fileObj._id === subFile)[0];
      tableData.push(obj);
    });
    setTableData(tableData);
  };

  const openFolder = (folderId) => {
    const newFolders = folders.map((folderObj) => {
      if (folderObj._id === folderId) {
        folderObj.open = true;
      } else {
        folderObj.open = false;
      }
      return folderObj;
    });

    setFolders(newFolders);
  };

  const openFile = (fileId) => {
    const newFiles = files.map((fileObj) => {
      if (fileObj._id === fileId) {
        fileObj.open = true;
      } else {
        fileObj.open = false;
      }
      return fileObj;
    });

    setFiles(newFiles);
  };

  const sortByField = (fieldName, order) => {
    const newTableData = tableData.sort((a, b) => {
      if (order === "desc") {
        if (a[fieldName] < b[fieldName]) {
          return -1;
        }
        if (a[fieldName] > b[fieldName]) {
          return 1;
        }
        return 0;
      } else {
        if (a[fieldName] > b[fieldName]) {
          return -1;
        }
        if (a[fieldName] < b[fieldName]) {
          return 1;
        }
        return 0;
      }
    });

    setTableData(newTableData);
    setSortBy(fieldName);
    setSortOrder(order);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSize = (obj) => {
    if (obj.type === "file") {
      let size = obj.size;
      let unit = "Bytes";

      if (size / 1024 >= 1) {
        unit = "Mbytes";
      }

      return `${size} ${unit}`;
    }
    return "";
  };

  const deleteFolder = () => {
    const newFiles = files.filter((fileObj) => !folder.subFiles.includes(fileObj._id));
    const newFolders = folders.filter((folderObj) => folderObj._id !== folder._id);

    setFiles(newFiles);
    setFolders(newFolders);
  };

  return (
    <div className="folder-body p-4 ">
      <table>
        <thead>
          <tr>
            <td>
              Name
              {!sortOrder || sortBy !== "name" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSort}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("name", "desc")}
                />
              ) : sortOrder === "desc" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortAlphaUp}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("name", "asc")}
                />
              ) : (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortAlphaDown}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("name", "desc")}
                />
              )}
            </td>
            <td>
              Created On
              {!sortOrder || sortBy !== "createdOn" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSort}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("createdOn", "desc")}
                />
              ) : sortOrder === "desc" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortNumericUp}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("createdOn", "asc")}
                />
              ) : (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortNumericDown}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("createdOn", "desc")}
                />
              )}
            </td>
            <td>
              Size
              {!sortOrder || sortBy !== "size" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSort}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("size", "desc")}
                />
              ) : sortOrder === "desc" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortNumericUp}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("size", "asc")}
                />
              ) : (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortNumericDown}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("size", "desc")}
                />
              )}
            </td>
            <td>
              Type
              {!sortOrder || sortBy !== "type" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSort}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("type", "desc")}
                />
              ) : sortOrder === "desc" ? (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortAlphaUp}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("type", "asc")}
                />
              ) : (
                <FontAwesomeIcon
                  className="exit-button pointer ml-4"
                  icon={faSortAlphaDown}
                  size="sm"
                  color="white"
                  onClick={() => sortByField("type", "desc")}
                />
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((obj) => {
              return (
                <tr
                  className="pointer"
                  onClick={
                    obj.type && obj.type === "folder"
                      ? () => openFolder(obj._id)
                      : () => openFile(obj._id)
                  }
                >
                  <td className="flex align-center justify-start" title={obj.name}>
                    <FontAwesomeIcon
                      className="exit-button pointer mr-2"
                      icon={obj.type && obj.type === "folder" ? faFolder : faFileWord}
                      size="2x"
                      color={obj.type && obj.type === "folder" ? "#d98324" : "white"}
                    />
                    {obj.name}
                  </td>
                  <td>{formatDate(obj.createdOn)}</td>
                  <td>{formatSize(obj)}</td>
                  <td>{obj.type && obj.type === "folder" ? "Folder" : "File"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* {folder._id !== 1 && (
        <FontAwesomeIcon
          className="delete-button pointer"
          icon={faTrashAlt}
          size="2x"
          color="#7c1f08"
          onClick={deleteFolder}
        />
      )} */}
    </div>
  );
};

export default FolderBody;
