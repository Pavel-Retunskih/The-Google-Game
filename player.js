export class Player {
  #name;
  #position;
  #score;
  constructor(name, score, position) {
    this.#name = name;
    this.#score = score;
    this.#position = position;
  }
  getName() {
    return this.#name;
  }
  getPosition() {
    return this.#position;
  }
  setPosition(position) {
    this.#position = position;
  }
  getScore() {
    return this.#score;
  }
}
