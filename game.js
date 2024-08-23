import { Position } from "./position";
import { Google } from "./google";
import { Player } from "./player";

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
  #players;

  constructor(numberUtil) {
    this.#settings = {
      gridSize: {
        columnsCount: 1,
        rowsCount: 2,
      },
      jumpInterval: 20,
    };
    this.#status = GAME_STATUSES.PENDING;
    this.#numberUtil = numberUtil;
    this.#google = new Google({
      x: Math.floor(this.#settings.gridSize.columnsCount / 2),
      y: Math.floor(this.#settings.gridSize.rowsCount / 2),
    });
    this.#players = [];

    // this.#playerOne = new Player("Player One", null, { x: 0, y: 0 });
    // this.#playerTwo = new Player("Player Two", null, {
    //   x: this.#settings.gridSize.columnsCount,
    //   y: this.#settings.gridSize.rowsCount,
    // });
  }

  //?-------------Setters---------
  setSettings(settings) {
    this.#settings = settings;
  }
  //?-------------Methods---------
  async startGame() {
    this.#status = GAME_STATUSES.IN_PROGRESS;

    setInterval(() => {
      this.#jumpGoogle();
    }, this.#settings.jumpInterval);
  }
  async addPlayer(name) {
    if (this.#players.length > 2) {
      throw new Error("Maximum number of players reached.");
    }
    if (this.#players.length === 0) {
      this.#players.push(new Player(name, 1, { x: 0, y: 0 }));
    }
    if (this.#players.length === 1) {
      this.#players.push(
        new Player(name, 2, {
          x: this.#settings.gridSize.columnsCount,
          y: this.#settings.gridSize.rowsCount,
        })
      );
    }
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
  #moveUnit(x, y) {
    return new Position(x, y);
  }
  //?-------------Getters---------
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
  async getPlayerOnePosition() {
    return this.#players[0].getPosition();
  }
  async getPlayerTwoPosition() {
    return this.#players[1].getPosition();
  }
}
