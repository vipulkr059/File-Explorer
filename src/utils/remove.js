export const remove = (tree, itemName, isFolder) => {
  if (!tree.isFolder) {
    return tree;
  }
  const filteredItems = tree.items.filter(
    (item) => !(item.name === itemName && item.isFolder === isFolder)
  );

  const updatedItems = filteredItems.map((child) =>
    remove(child, itemName, isFolder)
  );

  return { ...tree, items: updatedItems };
};
