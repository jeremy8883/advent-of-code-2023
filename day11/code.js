import R from "ramda";
import { parse2dNumberArray } from "../utils/inputParsing.js";
import { find2d, map2d, map2dSubsection } from "../utils/2d.js";
import { newRect } from "../utils/geometry.js";

export const parseInput = parse2dNumberArray;

const performFlashes = (count) => (octopuses) => {
  const location = find2d((o) => o > 9, octopuses);

  if (location == null) {
    return { octopuses, count };
  }

  const [x, y] = location;
  const newOs = map2dSubsection(
    (item, i, j) => {
      if (i === x && j === y) {
        return 0;
      }
      if (item === 0) return item;
      return item + 1;
    },
    newRect(x - 1, y - 1, 3, 3),
    octopuses
  );
  return performFlashes(count + 1)(newOs);
};

export const runChallengeA = (input, days) => {
  const result = R.range(0, days).reduce(
    (acc, day) => {
      return R.pipe(
        map2d((octopus) => octopus + 1),
        performFlashes(acc.count)
      )(acc.octopuses);
    },
    { count: 0, octopuses: input }
  );

  return result.count;
};

export const runChallengeB = (input, days) => {
  let acc = { count: 0, octopuses: input };

  return R.range(1, days + 1).find(
    (day) => {
      acc = R.pipe(
        map2d((octopus) => octopus + 1),
        performFlashes(0)
      )(acc.octopuses);

      return acc.count === input.length * input[0].length;
    },
    { count: 0, octopuses: input }
  );
};
