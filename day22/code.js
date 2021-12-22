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
      cuboid: R.fromPairs(instructionsArr),
    };
  });
};

const getPossibleCubes = (cuboid) =>
  R.range(cuboid.x[0], cuboid.x[1] + 1)
    .map((x) =>
      R.range(cuboid.y[0], cuboid.y[1] + 1).map((y) =>
        R.range(cuboid.z[0], cuboid.z[1] + 1).map((z) => [x, y, z])
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
      const { cuboid } = instruction;
      const { x, y, z } = cuboid;

      if (
        getIsCompletelyOutsideBounds(x, bounds) ||
        getIsCompletelyOutsideBounds(y, bounds) ||
        getIsCompletelyOutsideBounds(z, bounds)
      ) {
        return null;
      }

      return {
        ...instruction,
        cuboid: {
          x: [
            R.clamp(bounds[0], bounds[1], cuboid.x[0]),
            R.clamp(bounds[0], bounds[1], cuboid.x[1]),
          ],
          y: [
            R.clamp(bounds[0], bounds[1], cuboid.y[0]),
            R.clamp(bounds[0], bounds[1], cuboid.y[1]),
          ],
          z: [
            R.clamp(bounds[0], bounds[1], cuboid.z[0]),
            R.clamp(bounds[0], bounds[1], cuboid.z[1]),
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
      getPossibleCubes(instruction.cuboid).forEach(([x, y, z]) => {
        acc[`${x},${y},${z}`] = instruction.isOn;
      });
      return acc;
    }, {}),
    getOnCount
  )(instructions);
};

const getIntersections = () => {};

const getOnBoxes = (instructions) => {
  return instructions.reduce((acc, { isOn, cuboid }) => {
    const intersections = getIntersections(acc, cuboid);
    if (!intersections.length(acc, cuboid)) {
      return isOn ? [...acc, cuboid] : acc;
    }

    if (isOn) {
    } else {
    }
  }, []);
};

export const runChallengeB = (instructions) => {
  return R.pipe(getOnBoxes)(instructions);
};
