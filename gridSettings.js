export class GridSettings {
  #gridSize;

  constructor(columnsCount, rowsCount) {
    this.#gridSize = {
      columnsCount: columnsCount,
      rowsCount: rowsCount,
    };
  }
  getGridSize() {
    return this.#gridSize;
  }
  setGridSize(newGridSize) {
    this.#gridSize = newGridSize;
  }
}
