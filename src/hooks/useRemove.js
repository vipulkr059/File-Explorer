export function useRemove(onDelete) {
  const handleRemove = (itemName, isFolder) => {
    onDelete(itemName, isFolder);
  };

  return { handleRemove };
}
