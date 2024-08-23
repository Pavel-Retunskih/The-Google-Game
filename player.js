export class Player {
  #name;
  #id;
  #position;
  #score;
  constructor(name, id, position) {
    this.#name = name;
    this.#id = id;
    this.#score = 0;
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
  setScore(point) {
    this.#score += point;
  }
  getId() {
    return this.#id;
  }
}
