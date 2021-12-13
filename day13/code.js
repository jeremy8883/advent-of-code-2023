import R from "ramda";

export const parseInput = (str) => {
  const lines = str.split("\n");

  const points = lines
    .filter((l) => l && !l.startsWith("fold"))
    .map((l) => l.split(","))
    .map(([x, y]) => ({ x: Number(x), y: Number(y) }));

  const folds = lines
    .filter((l) => l && l.startsWith("fold"))
    .map((l) => l.replace("fold along", "").split("="))
    .map(([axis, value]) => ({ axis: axis.trim(), value: Number(value) }));

  return {
    points,
    folds,
  };
};

const makeFold = ({ axis, value }, point) => {
  if (axis === "x") {
    if (point.x < value) {
      return point;
    } else {
      return {
        ...point,
        x: point.x - 2 * (point.x - value),
      };
    }
  } else {
    if (point.y < value) {
      return point;
    } else {
      return {
        ...point,
        y: point.y - 2 * (point.y - value),
      };
    }
  }
};

export const runChallengeA = (input) => {
  return R.pipe(
    R.map((point) => {
      return makeFold(input.folds[0], point);
    }),
    R.uniqBy((point) => `${point.x},${point.y}`),
    R.prop("length")
  )(input.points);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
