import R from "ramda";
import { reduceChunks } from "../utils/array.js";

export const parseInput = (str) => {
  const lines = str.split("\n");
  return {
    seeds: lines[0]
      .replace("seeds: ", "")
      .split(" ")
      .map((v) => parseInt(v, 10)),
    maps: reduceChunks(
      (acc, value) => !!value,
      (acc, value) => {
        if (value.match(/map:/)) return acc;

        const s = value.split(" ").map((v) => parseInt(v, 10));
        return [...acc, { from: [s[1], s[1] + s[2]], to: [s[0], s[0] + s[2]] }];
      },
      [],
      R.tail(lines)
    ),
  };
};

const inRange = (range, val) => val >= range[0] && val < range[1];

const getLocation = (seed, maps) => {
  return maps.reduce((acc, ranges) => {
    const range = ranges.find((r) => inRange(r.from, acc));

    return range ? range.to[0] + (acc - range.from[0]) : acc;
  }, seed);
};

export const runChallengeA = (input) => {
  return R.pipe(
    R.map((seed) => getLocation(seed, input.maps)),
    R.reduce(R.min, Infinity)
  )(input.seeds);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
