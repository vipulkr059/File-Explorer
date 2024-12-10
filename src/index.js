import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FileManager from "./components/FileManager";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FileManager />
  </React.StrictMode>
);
