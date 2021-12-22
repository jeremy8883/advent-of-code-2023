import R from "ramda";

export const parseInput = (str) => {
  return str.split("\n").map((line) => {
    const [func, instructions] = line.split(" ");
    const instructionsArr = instructions.split(",").map((instruction) => {
      const [axis, range] = instruction.split("=");
      return [axis, range.split("..").map(Number)];
    });

    return {
      isOn: func === "on",
      ranges: R.fromPairs(instructionsArr),
    };
  });
};

const getPossibleCubes = (ranges) =>
  R.range(ranges.x[0], ranges.x[1] + 1)
    .map((x) =>
      R.range(ranges.y[0], ranges.y[1] + 1).map((y) =>
        R.range(ranges.z[0], ranges.z[1] + 1).map((z) => [x, y, z])
      )
    )
    .flat()
    .flat();

function getIsCompletelyOutsideBounds(range, bounds) {
  return (
    (range[0] < bounds[0] && range[1] < bounds[0]) ||
    (range[0] > bounds[1] && range[1] > bounds[1])
  );
}

const limitToBounds = (bounds) => (instructions) => {
  return instructions
    .map((instruction) => {
      const { ranges } = instruction;
      const { x, y, z } = ranges;

      if (
        getIsCompletelyOutsideBounds(x, bounds) ||
        getIsCompletelyOutsideBounds(y, bounds) ||
        getIsCompletelyOutsideBounds(z, bounds)
      ) {
        return null;
      }

      return {
        ...instruction,
        ranges: {
          x: [
            R.clamp(bounds[0], bounds[1], ranges.x[0]),
            R.clamp(bounds[0], bounds[1], ranges.x[1]),
          ],
          y: [
            R.clamp(bounds[0], bounds[1], ranges.y[0]),
            R.clamp(bounds[0], bounds[1], ranges.y[1]),
          ],
          z: [
            R.clamp(bounds[0], bounds[1], ranges.z[0]),
            R.clamp(bounds[0], bounds[1], ranges.z[1]),
          ],
        },
      };
    })
    .filter(Boolean);
};

const getOnCount = (map) => {
  return R.pipe(
    R.toPairs,
    R.reduce((acc, [key, value]) => acc + value, 0)
  )(map);
};

export const runChallengeA = (instructions) => {
  return R.pipe(
    limitToBounds([-50, 50]),
    R.reduce((acc, instruction) => {
      getPossibleCubes(instruction.ranges).forEach(([x, y, z]) => {
        acc[`${x},${y},${z}`] = instruction.isOn;
      });
      return acc;
    }, {}),
    getOnCount
  )(instructions);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
