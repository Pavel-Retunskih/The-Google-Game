import { Game, GAME_STATUSES } from "./game";
import { expect, describe, it } from "@jest/globals";

//?----------GAME_APP_TESTS-------------
describe("Game App tests", () => {
  it("the game must be change status !!!", async () => {
    const game = new Game();
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
    const game = new Game();

    await game.startGame();

    let googlePosition1 = await game.getGooglePosition();

    expect(googlePosition1).toBeDefined();

    await delay(3000);

    let googlePosition2 = await game.getGooglePosition();
    expect(googlePosition1).not.toEqual(googlePosition2);

    // await delay(4000);

    // let googlePosition3 = await game.getGooglePosition();
    // expect(googlePosition3).not.toEqual(googlePosition2);
  });
});

const delay = (ms) => {
  let delayTimerId;
  new Promise((res) => {
    delayTimerId = setTimeout(res, ms);
  });
  return clearInterval(delayTimerId);
};
