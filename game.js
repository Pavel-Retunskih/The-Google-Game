import { generateRandomNumber } from "./randomGenerator";

export const GAME_STATUSES = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  PAUSED: "paused",
  COMPLETED: "completed",
};

export class Game {
  #settings;
  #status = GAME_STATUSES.PENDING;
  #googlePosition = {
    row: 0,
    column: 0,
  };

  //-------------Setters---------
  setSettings(settings) {
    this.#settings = settings;
  }
  //-------------Methods---------
  async startGame() {
    console.log("Game started");
    this.#status = GAME_STATUSES.IN_PROGRESS;

    this.#jumpGoogle();
  }
  #jumpGoogle() {
    console.log("Google jumped");

    let prewRowPosition = this.#googlePosition.row;
    let prewColumnPosition = this.#googlePosition.column;

    do {
      this.#googlePosition.row = generateRandomNumber(0, 10);
      this.#googlePosition.column = generateRandomNumber(0, 10);
      console.log(
        `New Google position: (${this.#googlePosition.row}, ${
          this.#googlePosition.column
        })`
      );
    } while (
      this.#googlePosition.row === prewRowPosition &&
      this.#googlePosition.column === prewColumnPosition
    );
  }
  //-------------Geters----------
  async getStatus() {
    return this.#status;
  }
  async getSettings() {
    return this.#settings;
  }
  async getGooglePosition() {
    return this.#googlePosition;
  }
}
