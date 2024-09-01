import { Game, GAME_STATUSES } from "./game";
import { expect, describe, it, beforeEach } from "@jest/globals";
import { numberMagicUtil } from "./randomGenerator";
import { Settings } from "./settings";
import { GridSettings } from "./gridSettings";

let numberUtil;
let google;
let game;
let settings;
let status;
let gridSize;

beforeEach(async () => {
  gridSize = new GridSettings(0, 4);
  settings = new Settings(gridSize, 20, 10, 20);
  numberUtil = new numberMagicUtil();
  game = new Game(numberUtil, settings);
  status = await game.getStatus();
  google = await game.getGooglePosition();
  await game.addPlayer("Player One");
  await game.addPlayer("Player Two");
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

    for (let i = 0; i < 10; i++) {
      let googlePosition = await game.getGooglePosition();
      expect(googlePosition).toBeDefined();
      await delay(settings.jumpInterval);
      let googlePosition1 = await game.getGooglePosition();
      expect(googlePosition).not.toEqual(googlePosition1);
    }
  });
  it("google must jump to the empty cell", async () => {
    let playerOnePosition = await game.getPlayerOnePosition();
    let playerTwoPosition = await game.getPlayerTwoPosition();

    for (let i = 0; i < 100; i++) {
      let googlePosition = await game.getGooglePosition();
      expect(googlePosition).not.toEqual(
        playerOnePosition || playerTwoPosition
      );
      await delay(settings.jumpInterval);
      let googlePosition1 = await game.getGooglePosition();
      expect(googlePosition1).not.toEqual(
        playerOnePosition || playerTwoPosition
      );
    }
  });
});
//?----------PLAYER_TEST------------------
describe("Player Test", () => {
  it("must be initialized", async () => {
    const playerOne = await game.getPlayerOne();
    const playerTwo = await game.getPlayerTwo();

    expect(playerOne).not.toBeUndefined();
    expect(playerTwo).not.toBeUndefined();
  });
  it("Players must have correct name, score and id", async () => {
    const playerOne = await game.getPlayerOne();
    const playerTwo = await game.getPlayerTwo();

    expect(playerOne.getName()).toBe("Player One");
    expect(playerTwo.getName()).toBe("Player Two");

    expect(playerOne.getScore()).toBe(0);
    expect(playerTwo.getScore()).toBe(0);

    expect(playerOne.getId()).toBe(1);
    expect(playerTwo.getId()).toBe(2);
  });
  it("Player one must be in the left up corner of grid", async () => {
    let playerOnePosition = await game.getPlayerOnePosition();

    expect(playerOnePosition.x).toBe(0);
    expect(playerOnePosition.y).toBe(0);
  });
  it("Player two must be in the right bottom corner of grid", async () => {
    let playerTwoPosition = await game.getPlayerTwoPosition();

    expect(playerTwoPosition.x).toBe(settings.getGridSize().columnsCount - 1);
    expect(playerTwoPosition.y).toBe(settings.getGridSize().rowsCount - 1);
  });
});
//?----------SETTINGS_TEST------------------
describe("Settings test", () => {
  it("must be initialized", () => {
    expect(settings).not.toBeUndefined();
  });
  it("must have correct grid size", () => {
    gridSize = new GridSettings(5, 5);
    settings = new Settings(gridSize, 20, 10, 30);
    expect(settings.getGridSize().columnsCount).toBe(5);
    expect(settings.getGridSize().rowsCount).toBe(5);
  });
  it("must have correct jump interval", () => {
    settings = new Settings(gridSize, 20, 10, 50);
    expect(settings.getJumpInterval()).toBe(50);
  });
  it("must have correct points to win", () => {
    expect(settings.getPointsToWin()).toBe(20);
  });
  it("must have correct points to lose", () => {
    expect(settings.getPointsToLose()).toBe(10);
  });
});
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
