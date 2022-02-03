import React, { useContext, useState, useEffect } from "react";
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
      if (obj && obj._id) {
        tableData.push(obj);
      }
    });
    folder.subFiles.forEach((subFile) => {
      let obj = files.filter((fileObj) => fileObj._id === subFile)[0];
      if (obj && obj._id) {
        tableData.push(obj);
      }
    });

    console.log("TableData", tableData);
    setTableData(tableData);
  };

  const open = ({ _id, type }) => {
    if (type === "folder") {
      const newFolders = folders.map((folderObj) => {
        if (folderObj._id === _id) {
          folderObj.open = true;
        } else {
          folderObj.open = false;
        }
        return folderObj;
      });

      return setFolders(newFolders);
    } else {
      const newFiles = files.map((fileObj) => {
        if (fileObj._id === _id) {
          fileObj.open = true;
        } else {
          fileObj.open = false;
        }
        return fileObj;
      });

      return setFiles(newFiles);
    }
  };

  const deleteItem = ({ _id, type }) => {
    let newFolders;
    if (type === "folder") {
      newFolders = folders.filter((folderObj) => folderObj._id !== _id);
      newFolders = newFolders.map((folderObj) => {
        if (folderObj._id === folder._id) {
          folderObj.subFolders = folderObj.subFolders.filter((folderId) => folderId !== _id);
        }

        return folderObj;
      });
      console.log(newFolders);
      return setFolders(newFolders);
    } else {
      const newFiles = files.filter((fileObj) => fileObj._id !== _id);
      newFolders = folders.map((folderObj) => {
        if (folderObj._id === folder._id) {
          folderObj.subFiles = folderObj.subFiles.filter((fileId) => fileId !== _id);
        }

        return folderObj;
      });
      setFiles(newFiles);
      setFolders(newFolders);
    }
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
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((obj) => {
              return (
                <tr>
                  <td
                    className="flex align-center justify-start pointer"
                    title={obj.name}
                    onClick={() => open(obj)}
                  >
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
                  <td>
                    <FontAwesomeIcon
                      className="pointer"
                      icon={faTrashAlt}
                      size="2x"
                      color="#7c1f08"
                      onClick={() => deleteItem(obj)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FolderBody;
