export const create = function (tree, folderId, item, isFolder) {
  if (tree.id === folderId && tree.isFolder) {
    tree.items.unshift({
      id: new Date().getTime(),
      name: item,
      isFolder: isFolder,
      items: [],
    });

    return tree;
  }

  let latestNode = [];
  latestNode = tree.items.map((ob) => {
    return create(ob, folderId, item, isFolder);
  });

  return { ...tree, items: latestNode };
};
