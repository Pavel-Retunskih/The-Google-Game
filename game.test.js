import { Game, GAME_STATUSES } from "./game";
import { expect, describe, it } from "@jest/globals";
import { numberMagicUtil } from "./randomGenerator";
//?----------GAME_APP_TESTS-------------
describe("Game App tests", () => {
  it("the game must be change status !!!", async () => {
    const numberUtil = new numberMagicUtil();
    const game = new Game(numberUtil);
    let status = await game.getStatus();

    expect(status).toBe(GAME_STATUSES.PENDING);

    game.startGame();
    status = await game.getStatus();
    expect(status).toBe(GAME_STATUSES.IN_PROGRESS);
  });
});
//?----------GOOGLE_TEST-----------------
describe("Google tests", () => {
  it("the google must be change position every 2 sec!!!", async () => {
    const numberUtil = new numberMagicUtil();
    const game = new Game(numberUtil);
    let settings = await game.getSettings();
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
