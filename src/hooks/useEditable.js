import { useState } from "react";

export function useEditable(initialName, onRename) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const startEditing = () => setIsEditing(true);

  const submitRename = (newName) => {
    if (newName.trim()) {
      onRename(name, newName.trim());
      setName(newName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitRename(e.target.value);
    }
  };

  const handleBlur = (e) => submitRename(e.target.value);

  return {
    name,
    isEditing,
    setIsEditing,
    setName,
    startEditing,
    submitRename,
    handleKeyDown,
    handleBlur,
  };
}
