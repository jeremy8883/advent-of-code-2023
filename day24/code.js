import R from "ramda";
import { parseInt10 } from "../utils/number.js";
import { logFull } from "../utils/log.js";

export const parseInput = (str) =>
  str.split("\n").map((l) => {
    let [pos, velocity] = l.split(" @ ");

    pos = pos.split(", ").map(parseInt10);
    velocity = velocity.split(", ").map(parseInt10);

    return {
      pos: {
        x: pos[0],
        y: pos[1],
        z: pos[2],
      },
      velocity: {
        x: velocity[0],
        y: velocity[1],
        z: velocity[2],
      },
    };
  });

const toLinearEquation = ({ pos, velocity }) => {
  const xCoefficient = velocity.y / velocity.x;
  const yIntersect = pos.y - xCoefficient * pos.x;

  return { xCoefficient, yIntersect };
};

const getXyIntersectPoint = (posVel1, posVel2) => {
  const { xCoefficient: a1, yIntersect: b1 } = toLinearEquation(posVel1);
  const { xCoefficient: a2, yIntersect: b2 } = toLinearEquation(posVel2);

  if (a1 === a2) {
    return null;
  }

  const x = (b2 - b1) / (a1 - a2);
  const y = a1 * x + b1;

  return { x, y };
};

const isInTestRange =
  (minRange, maxRange) =>
  ({ intersection: { x, y } }) =>
    x >= minRange && y >= minRange && x <= maxRange && y <= maxRange;

const intersectsInFutureSingle = (intersection, { pos, velocity }) => {
  if (velocity.x === 0 || velocity.y === 0) throw new Error("oh no!");
  if (
    (velocity.x > 0 && intersection.x < pos.x) ||
    (velocity.x < 0 && intersection.x > pos.x)
  ) {
    return false;
  } else if (
    (velocity.y > 0 && intersection.y < pos.y) ||
    (velocity < 0 && intersection.y > pos.y)
  ) {
    return false;
  }
  return true;
};

const intersectsInFuture = ({ intersection, posVelA, posVelB }) =>
  intersectsInFutureSingle(intersection, posVelA) &&
  intersectsInFutureSingle(intersection, posVelB);

export const runChallengeA = (
  input,
  minRange = 200000000000000,
  maxRange = 400000000000000
) => {
  return input.slice(0, input.length - 1).reduce((acc, posVelA, i) => {
    let intersections = R.pipe(
      R.slice(i + 1, input.length),
      R.map((posVelB) => ({
        posVelA,
        posVelB,
        intersection: getXyIntersectPoint(posVelA, posVelB),
      })),
      R.filter(({ intersection }) => !!intersection),
      R.filter(isInTestRange(minRange, maxRange)),
      R.filter(intersectsInFuture)
    )(input);
    return acc + intersections.length;
  }, 0);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
