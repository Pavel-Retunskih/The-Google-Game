export class Google {
  #position;

  setPosition(newPosition) {
    this.#position = newPosition;
  }
  getPosition() {
    return this.#position;
  }
}
