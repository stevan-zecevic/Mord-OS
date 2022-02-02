import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./components/Context/AuthProvider";
import { FoldersProvider } from "./components/Context/FoldersProvider";
import { FilesProvider } from "./components/Context/FilesProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <FoldersProvider>
        <FilesProvider>
          <App />
        </FilesProvider>
      </FoldersProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
