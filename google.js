export class Google {
  #position;
  constructor(x, y) {
    this.#position = { x, y };
  }
  setPosition(newPosition) {
    this.#position = newPosition;
  }
  getPosition() {
    return this.#position;
  }
}
