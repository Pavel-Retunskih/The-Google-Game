import { generateRandomNumber } from "./randomGenerator";

export const GAME_STATUSES = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  PAUSED: "paused",
  COMPLETED: "completed",
};

export class Game {
  #settings = {
    gridSize: {
      columnsCount: 1,
      rowsCount: 2,
    },
    jumpInterval: 30,
  };
  #status = GAME_STATUSES.PENDING;
  #googlePosition = {
    x: 0,
    y: 0,
  };

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
      x: generateRandomNumber(0, this.#settings.gridSize.columnsCount),
      y: generateRandomNumber(0, this.#settings.gridSize.rowsCount),
    };
    if (
      this.#googlePosition.x === newGooglePosition.x &&
      this.#googlePosition.y === newGooglePosition.y
    ) {
      this.#jumpGoogle();
    } else {
      this.#googlePosition = newGooglePosition;
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
    return this.#googlePosition;
  }
  async getSettings() {
    return this.#settings;
  }
}
