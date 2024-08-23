export class Settings {
  #pointsToWin;
  #pointsToLose;
  #gridSize;
  #jumpInterval;

  constructor(gridSize, pointsToWin, pointsToLose, jumpInterval) {
    this.#gridSize = gridSize.getGridSize();
    this.#pointsToWin = pointsToWin;
    this.#pointsToLose = pointsToLose;
    this.#jumpInterval = jumpInterval;
  }
  getPointsToWin() {
    return this.#pointsToWin;
  }
  getPointsToLose() {
    return this.#pointsToLose;
  }
  getGridSize() {
    return this.#gridSize;
  }
  getJumpInterval() {
    return this.#jumpInterval;
  }
}
