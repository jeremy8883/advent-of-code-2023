import {
  runChallengeA,
  runChallengeB,
  parseInput,
  isInsidePolygon,
  makeOneOffCorrection,
} from "./code.js";
import { newPoint } from "../utils/geometry.js";
import { picksTheoremArea } from "./picksTheormeArea.js";

const mockInput = parseInput(
  `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`
);

describe("Day 18: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(62);
  });
});

describe("isInsidePolygon", () => {
  it.each([newPoint(0, 0)])("works", (point) => {
    const polygon = [
      newPoint(-2, -2),
      newPoint(2, -2),
      newPoint(2, 2),
      newPoint(-2, 2),
    ];

    const result = isInsidePolygon(point, polygon);
    expect(result).toEqual("INSIDE");
  });

  it.each([
    newPoint(0, 2),
    newPoint(2, 2),
    newPoint(-2, -2),
    newPoint(0, 2),
    newPoint(-2, 0),
  ])("works", (point) => {
    const polygon = [
      newPoint(-2, -2),
      newPoint(2, -2),
      newPoint(2, 2),
      newPoint(-2, 2),
    ];

    const result = isInsidePolygon(point, polygon);
    expect(result).toEqual("EDGE");
  });

  it.each([
    newPoint(0, 3),
    newPoint(3, 3),
    newPoint(-3, -3),
    newPoint(0, 3),
    newPoint(-3, 0),
  ])("works", (point) => {
    const polygon = [
      newPoint(-2, -2),
      newPoint(2, -2),
      newPoint(2, 2),
      newPoint(-2, 2),
    ];

    const result = isInsidePolygon(point, polygon);
    expect(result).toEqual("OUTSIDE");
  });
});

describe("makeOneOffCorrection", () => {
  it.each([
    [newPoint(0, 0), newPoint(0, 0)],
    [newPoint(6, 0), newPoint(7, 0)],
    [newPoint(6, 5), newPoint(7, 6)],
    [newPoint(4, 5), newPoint(5, 6)],
    [newPoint(4, 7), newPoint(5, 7)],
    [newPoint(6, 7), newPoint(7, 7)],
    [newPoint(6, 9), newPoint(7, 10)],
    [newPoint(1, 9), newPoint(1, 10)],
    [newPoint(1, 7), newPoint(1, 8)],
    [newPoint(0, 7), newPoint(0, 8)],
    [newPoint(0, 5), newPoint(0, 5)],
    [newPoint(2, 5), newPoint(2, 5)],
    [newPoint(2, 2), newPoint(2, 3)],
    [newPoint(0, 2), newPoint(0, 3)],
  ])("makes the appropriate correction", (point, expected) => {
    const polygon = [
      newPoint(0, 0),
      newPoint(6, 0),
      newPoint(6, 5),
      newPoint(4, 5),
      newPoint(4, 7),
      newPoint(6, 7),
      newPoint(6, 9),
      newPoint(1, 9),
      newPoint(1, 7),
      newPoint(0, 7),
      newPoint(0, 5),
      newPoint(2, 5),
      newPoint(2, 2),
      newPoint(0, 2),
    ];

    const result = makeOneOffCorrection(polygon)(point);
    expect(result).toEqual(expected);
  });
});

describe("picksTheoremArea", () => {
  it.each([
    [[newPoint(0, 0), newPoint(2, 0), newPoint(2, 2), newPoint(0, 2)], 4],
  ])("returns the area", (polygon, area) => {
    expect(picksTheoremArea(polygon)).toEqual(area);
  });
});

describe("Day 18: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(952408144115);
  });
});
