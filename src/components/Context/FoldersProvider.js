import React, { useState, createContext, useEffect } from "react";

const FoldersContext = createContext({
  folders: [],
});

const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    let folders = [];
    let localArray = [];

    if (localStorage.getItem("folders")) {
      localArray = JSON.parse(localStorage.getItem("folders"));
    } else {
      folders.push({
        _id: 1,
        open: false,
        name: "Desktop",
        createdOn: new Date(),
        subFolders: [],
        subFiles: [],
        type: "folder",
      });
    }
    console.log(folders, localArray);
    setFolders([...folders, ...localArray]);
  }, []);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  return (
    <FoldersContext.Provider
      value={{
        folders,
        setFolders,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export { FoldersProvider, FoldersContext };
