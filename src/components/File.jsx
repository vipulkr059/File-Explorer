import { BiFile, BiTrash, BiPencil } from "react-icons/bi";
import { useEditable } from "../hooks/useEditable";
import { useRemove } from "../hooks/useRemove";

export function File({ name, onDelete, onRename }) {
  const {
    name: fileName,
    isEditing,
    startEditing,
    handleKeyDown,
    handleBlur,
  } = useEditable(name, onRename);

  const { handleRemove } = useRemove(onDelete);

  return (
    <div className="ml-2 flex justify-between items-center mb-1 mt-1 p-1 text-white">
      <div className="flex items-center justify-center">
        {isEditing ? (
          <input
            type="text"
            defaultValue={fileName}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="border border-gray-300 p-1 rounded w-full text-black"
            autoFocus
          />
        ) : (
          <>
            <BiFile className="inline mr-1 text-white" />
            <span className="font-semibold text-white">{fileName}</span>
          </>
        )}
      </div>
      <div className="flex space-x-2">
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
            handleRemove(name, false);
          }}
          className="text-sm text-white bg-red-500 p-2 rounded hover:bg-red-400"
        >
          <BiTrash />
        </button>
      </div>
    </div>
  );
}
