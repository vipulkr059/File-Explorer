export const rename = (tree, itemId, newName) => {
  if (tree.id === itemId) {
    return { ...tree, name: newName };
  }

  if (!tree.isFolder) {
    return tree;
  }

  const updatedItems = tree.items.map((child) =>
    rename(child, itemId, newName)
  );

  return { ...tree, items: updatedItems };
};
