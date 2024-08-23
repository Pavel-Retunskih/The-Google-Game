export class Position {
  #x;
  #y;

  constructor(row, column) {
    this.#x = column;
    this.#y = row;
  }

  getPosition() {
    return {
      x: this.#x,
      y: this.#y,
    };
  }
  setPosition() {
    this.#x = column;
    this.#y = row;
  }
}
