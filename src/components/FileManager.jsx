import React, { useState } from "react";
import { Folder } from "./Folder";
import { FolderData } from "../data";
import { create } from "../utils/create";
import { remove } from "../utils/remove";
import { rename } from "../utils/rename";

const FileManager = () => {
  const [structure, setStructure] = useState(FolderData);

  const handleCreate = (folderId, item, isFolder) => {
    const finalTree = create(structure, folderId, item, isFolder);
    setStructure(finalTree);
  };

  const handleDelete = (item, isFolder) => {
    const finalTree = remove(structure, item, isFolder);
    setStructure(finalTree);
  };

  const handleRename = (itemId, newName) => {
    const finalTree = rename(structure, itemId, newName);
    setStructure(finalTree);
  };

  return (
    <div className="p-4 min-h-screen bg-neutral-800">
      <Folder
        structure={structure}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onRename={handleRename}
      />
    </div>
  );
};

export default FileManager;
