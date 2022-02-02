import React, { useState, createContext, useEffect } from "react";

const FilesContext = createContext({
  isAuthenticated: false,
});

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("files")) {
      const localFiles = JSON.parse(localStorage.getItem("files"));
      setFiles([...files, ...localFiles]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export { FilesProvider, FilesContext };
