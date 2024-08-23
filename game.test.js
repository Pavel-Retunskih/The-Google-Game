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
  google = new Google();
  game = new Game(numberUtil, google);
  status = await game.getStatus();
  settings = await game.getSettings();
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
    expect(game.getGoogle()).not.toBeUndefined();
  });
  it("should set and get position correctly", () => {
    const newPosition = { x: 2, y: 3 };
    google.setPosition(newPosition);
    expect(google.getPosition()).toBe(newPosition);
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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
