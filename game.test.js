import { Game, GAME_STATUSES } from "./game";
import { expect, describe, it, beforeEach } from "@jest/globals";
import { numberMagicUtil } from "./randomGenerator";
import { Google } from "./google";
import { Position } from "./position";

let numberUtil;
let google;
let game;
let settings;
let status;

beforeEach(async () => {
  numberUtil = new numberMagicUtil();
  game = new Game(numberUtil);
  status = await game.getStatus();
  settings = await game.getSettings();
  google = await game.getGooglePosition();
});

//?----------GAME_APP_TESTS-------------

describe("Game App tests", () => {
  it("the game must be change status !!!", async () => {
    expect(status).toBe(GAME_STATUSES.PENDING);

    game.startGame();
    status = await game.getStatus();
    expect(status).toBe(GAME_STATUSES.IN_PROGRESS);
  });
});
//?----------GOOGLE_TEST-----------------
describe("Google tests", () => {
  it("must be initialized", () => {
    expect(google).not.toBeUndefined();
  });
  it("the google must be change position every 2 sec!!!", async () => {
    await game.startGame();

    for (let i = 0; i < 100; i++) {
      let googlePosition = await game.getGooglePosition();
      expect(googlePosition).toBeDefined();
      await delay(settings.jumpInterval);
      let googlePosition1 = await game.getGooglePosition();
      expect(googlePosition).not.toEqual(googlePosition1);
    }
  });
});
//?----------PLAYER_TEST------------------
describe("Player Test", () => {
  it("must be initialized", async () => {
    const playerOnePosition = await game.getPlayerOnePosition();
    const playerTwoPosition = await game.getPlayerTwoPosition();
    expect(playerOnePosition).not.toBeUndefined();
    expect(playerTwoPosition).not.toBeUndefined();
  });
  it("Player one must be in the left up corner of grid", async () => {
    let playerOnePosition = await game.getPlayerOnePosition();
    expect(playerOnePosition.x).toBe(0);
    expect(playerOnePosition.y).toBe(0);
  });
  it("Player two must be in the right bottom corner of grid", async () => {
    let playerTwoPosition = await game.getPlayerTwoPosition();
    expect(playerTwoPosition.x).toBe(settings.gridSize.columnsCount);
    expect(playerTwoPosition.y).toBe(settings.gridSize.rowsCount);
  });
});
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
