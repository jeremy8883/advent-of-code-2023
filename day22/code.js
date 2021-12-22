import R from "ramda";

export const parseInput = (str) => {
  return str.split("\n").map((line) => {
    const [func, instructions] = line.split(" ");
    const instructionsArr = instructions.split(",").map((instruction) => {
      const [axis, range] = instruction.split("=");
      const newRange = range.split("..").map(Number);
      newRange[1] = newRange[1] + 1;

      return [axis, newRange];
    });

    return {
      isOn: func === "on",
      cuboid: R.fromPairs(instructionsArr),
    };
  });
};

const getPossibleCubes = (cuboid) =>
  R.range(cuboid.x[0], cuboid.x[1])
    .map((x) =>
      R.range(cuboid.y[0], cuboid.y[1]).map((y) =>
        R.range(cuboid.z[0], cuboid.z[1]).map((z) => [x, y, z])
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
    limitToBounds([-50, 51]),
    R.reduce((acc, instruction) => {
      getPossibleCubes(instruction.cuboid).forEach(([x, y, z]) => {
        acc[`${x},${y},${z}`] = instruction.isOn;
      });
      return acc;
    }, {}),
    getOnCount
  )(instructions);
};

const _getIntersectsByAxis = (aRange, bRange) =>
  aRange[1] > bRange[0] && aRange[0] < bRange[1];

export const _getIntersects = (cuboidA, cuboidB) => {
  return (
    _getIntersectsByAxis(cuboidB.x, cuboidA.x) &&
    _getIntersectsByAxis(cuboidB.y, cuboidA.y) &&
    _getIntersectsByAxis(cuboidB.z, cuboidA.z)
  );
};

const getIsSplitable = (range, value) => value > range[0] && value < range[1];

export const _getFaces = (cuboid) => {
  return [
    ["x", 0],
    ["x", 1],
    ["y", 0],
    ["y", 1],
    ["z", 0],
    ["z", 1],
  ].map(([axis, rangeIndex]) => {
    const value = cuboid[axis][rangeIndex];
    return { axis, value };
  });
};

export const _splitCuboidsByAxis = (cuboids, { axis, value }) => {
  return cuboids.flatMap((cuboid) => {
    if (!getIsSplitable(cuboid[axis], value)) {
      return [cuboid];
    }
    return [
      {
        ...cuboid,
        [axis]: [cuboid[axis][0], value],
      },
      {
        ...cuboid,
        [axis]: [value, cuboid[axis][1]],
      },
    ];
  });
};

export const _splitCuboids = (existingCuboids, cuboid) => {
  return existingCuboids.flatMap((existingCuboid) => {
    if (!_getIntersects(cuboid, existingCuboid)) {
      return [existingCuboid];
    }

    return _getFaces(cuboid).reduce(
      (acc, intersection) => {
        return _splitCuboidsByAxis(acc, intersection);
      },
      [existingCuboid]
    );
  });
};

const getOnBoxes = (instructions) => {
  return instructions.reduce((acc, { isOn, cuboid }) => {
    const splitCuboids = _splitCuboids(acc, cuboid).filter(
      (ec) => !_getIntersects(ec, cuboid)
    );

    return isOn ? [...splitCuboids, cuboid] : splitCuboids;
  }, []);
};

const getCubeCount = (cuboids) => {
  return cuboids.reduce(
    (acc, cuboid) =>
      acc +
      (cuboid.x[1] - cuboid.x[0]) *
        (cuboid.y[1] - cuboid.y[0]) *
        (cuboid.z[1] - cuboid.z[0]),
    0
  );
};

export const runChallengeB = (instructions) => {
  return R.pipe(getOnBoxes, getCubeCount)(instructions);
};
