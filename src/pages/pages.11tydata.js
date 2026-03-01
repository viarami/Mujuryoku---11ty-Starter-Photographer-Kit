function normalizePath(path) {
  return path.replace(/\/+/g, "/");
}

module.exports = {
  permalink: (data) => {
    const stem = data.page.filePathStem.replace(/^\/pages/, "");
    const basePath = stem === "/index" ? "" : stem;
    const pageNumber = data.pagination && Number.isInteger(data.pagination.pageNumber)
      ? data.pagination.pageNumber
      : 0;

    if (pageNumber > 0) {
      return normalizePath(`${basePath}/${pageNumber + 1}/index.html`);
    }

    return normalizePath(`${basePath}/index.html`);
  },
};
