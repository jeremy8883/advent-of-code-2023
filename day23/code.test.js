import {
  runChallengeA,
  runChallengeB,
  parseInput,
  _getAllAmphipods,
  _getIsInSideRoom,
  _getAvailableMovesForAmphipod,
  _moveAmphipod,
  _getCost,
  _getAllLiveAmphipodPositions,
  _play,
} from "./code.js";
import { gridToString } from "../utils/2d.js";

const mockInput = parseInput(`#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`);

const simpleMock = parseInput(`#############
#.....D....C#
###.#.#B#.###
  #A#.#.#.#
  #########`);

describe("_getAllPieces", () => {
  it("returns all pieces", () => {
    const result = _getAllAmphipods(simpleMock);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "x": 6,
          "y": 1,
        },
        Object {
          "x": 11,
          "y": 1,
        },
        Object {
          "x": 7,
          "y": 2,
        },
        Object {
          "x": 3,
          "y": 3,
        },
      ]
    `);
  });
});

describe("_isInHallway", () => {
  it("returns true if in side room", () => {
    const result = _getIsInSideRoom({ x: 3, y: 3 }, simpleMock);
    expect(result).toEqual(true);
  });

  it("returns false if in hallway", () => {
    const result = _getIsInSideRoom({ x: 11, y: 1 }, simpleMock);
    expect(result).toEqual(false);
  });
});

describe("_getAvailableMovesForPiece", () => {
  it("returns the possible moves if in the side room", () => {
    const result = _getAvailableMovesForAmphipod({ x: 7, y: 2 }, simpleMock);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "x": 8,
          "y": 1,
        },
        Object {
          "x": 10,
          "y": 1,
        },
      ]
    `);
  });

  it("returns an empty array if there are no moves", () => {
    const result = _getAvailableMovesForAmphipod({ x: 3, y: 3 }, mockInput);
    expect(result).toEqual([]);
  });

  it("returns the amphipod's side room location if there's a clear path", () => {
    const result = _getAvailableMovesForAmphipod({ x: 6, y: 1 }, simpleMock);
    expect(result).toEqual([{ x: 9, y: 3 }]);
  });

  it("returns an empty array, if its sideroom is taken up by another type", () => {
    const result = _getAvailableMovesForAmphipod({ x: 11, y: 1 }, simpleMock);
    expect(result).toEqual([]);
  });

  it("returns an empty array if the amphipod is already in its final position", () => {
    const result = _getAvailableMovesForAmphipod({ x: 3, y: 3 }, simpleMock);
    expect(result).toEqual([]);
  });
});

describe("_moveAmphipod", () => {
  it("moves the amphoid", () => {
    const result = _moveAmphipod({ x: 6, y: 1 }, { x: 9, y: 3 }, simpleMock);
    expect(gridToString(result)).toEqual(`#############
#..........C#
###.#.#B#.###
  #A#.#.#D#
  #########`);
  });
});

describe("_getCost", () => {
  it("returns the cost of a move", () => {
    const result = _getCost({ x: 6, y: 1 }, { x: 9, y: 3 }, simpleMock);
    expect(result).toEqual(5000);
  });
});

describe("_getAllLiveAmphipodPositions", () => {
  it("returns all live amphipod positions", () => {
    const result = _getAllLiveAmphipodPositions(simpleMock);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "x": 6,
          "y": 1,
        },
        Object {
          "x": 11,
          "y": 1,
        },
        Object {
          "x": 7,
          "y": 2,
        },
      ]
    `);
  });
});

describe("_play", () => {
  it("solves a very simple game", () => {
    const result = _play(
      parseInput(`#############
#A..........#
###.#.#.#.###
  #.#.#.#.#
  #########`)
    );
    expect(result).toEqual(4);
  });
});

xdescribe("Day 23: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(12521);
  });
});

xdescribe("Day 23: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(44169);
  });
});
