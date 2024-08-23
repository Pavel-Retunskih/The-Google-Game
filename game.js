import { numberUtil } from "./randomGenerator";

export const GAME_STATUSES = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  PAUSED: "paused",
  COMPLETED: "completed",
};

export class Game {
  #numberUtil;
  #status;
  #settings;
  #google;
  constructor(numberUtil, google) {
    this.#status = GAME_STATUSES.PENDING;
    this.#numberUtil = numberUtil;
    this.#google = google;
    this.#settings = {
      gridSize: {
        columnsCount: 1,
        rowsCount: 2,
      },
      jumpInterval: 20,
    };
    this.#google.setPosition({
      x: 0,
      y: 0,
    });
  }

  //-------------Setters---------
  setSettings(settings) {
    this.#settings = settings;
  }
  //-------------Methods---------
  async startGame() {
    console.log("Game started");
    this.#status = GAME_STATUSES.IN_PROGRESS;

    setInterval(() => {
      this.#jumpGoogle();
    }, this.#settings.jumpInterval);
  }

  #jumpGoogle() {
    const newGooglePosition = {
      x: this.#numberUtil.getRandomNumber(
        0,
        this.#settings.gridSize.columnsCount
      ),
      y: this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount),
    };
    const prevGooglePosition = this.#google.getPosition();
    if (
      prevGooglePosition.x === newGooglePosition.x &&
      prevGooglePosition.y === newGooglePosition.y
    ) {
      this.#jumpGoogle();
    } else {
      this.#google.setPosition(newGooglePosition);
    }
  }
  //-------------Geters----------
  async getStatus() {
    return this.#status;
  }
  async getSettings() {
    return this.#settings;
  }
  async getGooglePosition() {
    return this.#google.getPosition();
  }
  async getSettings() {
    return this.#settings;
  }
}
