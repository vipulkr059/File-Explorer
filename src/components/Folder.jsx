import { useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiFile,
  BiFolder,
  BiFolderPlus,
  BiPencil,
  BiSolidFilePlus,
  BiTrash,
} from "react-icons/bi";
import { File } from "./File";
import { useRemove } from "../hooks/useRemove";
import { useEditable } from "../hooks/useEditable";

export const Folder = ({ structure, onCreate, onDelete, onRename }) => {
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [expand, setExpand] = useState(false);
  const {
    name: folderName,
    isEditing,
    startEditing,
    handleKeyDown: handleRenameKeyDown,
    handleBlur: handleRenameBlur,
  } = useEditable(structure.name, onRename);

  const { handleRemove } = useRemove(onDelete);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      onCreate(structure.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (structure.isFolder) {
    return (
      <div className="mt-1 ml-2">
        <div
          className="flex items-center gap-5 justify-between cursor-pointer bg-slate-400 p-1"
          onClick={() => setExpand(!expand)}
        >
          <div className="flex items-center gap-1">
            {expand ? <BiChevronUp /> : <BiChevronDown />}
            {expand ? "📂" : "📁"}
            {isEditing ? (
              <input
                type="text"
                defaultValue={folderName}
                onKeyDown={handleRenameKeyDown}
                onBlur={handleRenameBlur}
                className="border border-gray-300 p-1 rounded w-full text-black"
                autoFocus
              />
            ) : (
              <span className="font-bold">{folderName}</span>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={(e) => handleNewFolder(e, true)}
              className="text-sm text-white bg-neutral-900 p-2 rounded hover:bg-white hover:text-black"
            >
              <BiFolderPlus />
            </button>
            <button
              onClick={(e) => handleNewFolder(e, false)}
              className="text-sm text-white bg-neutral-900 p-2 rounded hover:bg-white hover:text-black"
            >
              <BiSolidFilePlus />
            </button>

            {!isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing();
                }}
                className="text-sm text-white bg-yellow-500 p-2 rounded hover:bg-yellow-400"
              >
                <BiPencil />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(structure.name, true);
              }}
              className="text-sm text-white bg-red-500 p-2 rounded hover:bg-red-400"
            >
              <BiTrash />
            </button>
          </div>
        </div>
        <div className={`ml-6 ${expand ? "block" : "hidden"}`}>
          {showInput.visible && (
            <div className="flex items-center space-x-2 mb-2">
              <span>{showInput.isFolder ? <BiFolder /> : <BiFile />}</span>
              <input
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                className="border border-gray-300 p-1 rounded w-full"
              />
            </div>
          )}
          {structure.items.map((item) => {
            return (
              <Folder
                structure={item}
                onCreate={onCreate}
                onDelete={onDelete}
                onRename={onRename}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <File
        onDelete={onDelete}
        onRename={onRename}
        name={structure.name}
        id={structure.id}
      />
    );
  }
};

export default Folder;
