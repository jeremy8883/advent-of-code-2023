import { runChallengeA, runChallengeB, parseInput } from "./code.js";

describe("Day 10: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(
      parseInput(
        `.....
.S-7.
.|.|.
.L-J.
.....`
      )
    );
    expect(result).toEqual(4);
  });

  it("gets the results", () => {
    const result = runChallengeA(
      parseInput(
        `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
      )
    );
    expect(result).toEqual(8);
  });
});

describe("Day 10: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(
      parseInput(
        `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`
      )
    );
    expect(result).toEqual(4);
  });

  it("gets the results", () => {
    const result = runChallengeB(
      parseInput(
        `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`
      )
    );
    expect(result).toEqual(4);
  });

  it("gets the results", () => {
    const result = runChallengeB(
      parseInput(
        `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`
      )
    );
    expect(result).toEqual(10);
  });
});
