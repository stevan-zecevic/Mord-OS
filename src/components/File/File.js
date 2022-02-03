import React from "react";
import { useContext } from "react/cjs/react.development";
import { FilesContext } from "../Context/FilesProvider";
import FileHeader from "./FileHeader";

const File = ({ file = {} }) => {
  const { files, setFiles } = useContext(FilesContext);

  const updateFile = ({ target: { value } }) => {
    const newFiles = files.map((fileObj) => {
      if (fileObj._id === file._id) {
        fileObj.content = value;
        fileObj.size = fileObj.content.length * 8;
      }

      return fileObj;
    });

    setFiles(newFiles);
  };

  return (
    <section className="file window">
      <FileHeader file={file} />
      <textarea
        className="p-4"
        value={file.content}
        onChange={updateFile}
        placeholder="Type in text..."
      />
    </section>
  );
};

export default File;
