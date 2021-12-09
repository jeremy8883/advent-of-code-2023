import { getPosition, getPositionWithAim } from "./getPosition.js";

describe("getPosition", () => {
  it("returns the correct position", () => {
    const result = getPosition([
      { command: "forward", amount: 5 },
      { command: "down", amount: 5 },
      { command: "forward", amount: 8 },
      { command: "up", amount: 3 },
      { command: "down", amount: 8 },
      { command: "forward", amount: 2 },
    ]);

    expect(result).toEqual({
      pos: 15,
      depth: 10,
    });
  });
});

describe("getPositionWithAim", () => {
  it("returns the correct position", () => {
    const result = getPositionWithAim([
      { command: "forward", amount: 5 },
      { command: "down", amount: 5 },
      { command: "forward", amount: 8 },
      { command: "up", amount: 3 },
      { command: "down", amount: 8 },
      { command: "forward", amount: 2 },
    ]);

    expect(result).toEqual({
      pos: 15,
      depth: 60,
      aim: 10,
    });
  });
});
