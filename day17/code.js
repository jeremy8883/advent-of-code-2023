import R from "ramda";
import {
  addPoints,
  getX2,
  isInside,
  newPoint,
  newRect,
  newRectByPoints,
} from "../utils/geometry.js";

export const parseInput = (str) => {
  const split = str
    .replace("target area: ", "")
    .split(", ")
    .map((l) => l.replace("x=", "").replace("y=", "").split(".."));
  const rect = newRectByPoints(
    parseInt(split[0][0]),
    parseInt(split[1][0]),
    parseInt(split[0][1]),
    parseInt(split[1][1])
  );

  // Add 1, because the input uses x2 and y2 as inclusive bounds, but I am using exclusive bounds
  return newRect(rect.x, rect.y, rect.width + 1, rect.height + 1);
};

const isBelow = (point, area) => {
  return point.y < area.y;
};

const isToRight = (point, area) => point.x > getX2(area);

const getIsOnTarget = (
  velocity,
  targetArea,
  point = newPoint(0, 0),
  peakY = 0
) => {
  const newPos = addPoints(velocity, point);

  if (isBelow(newPos, targetArea) || isToRight(newPos, targetArea)) {
    return {
      isOnTarget: false,
      reason:
        isBelow(newPos, targetArea) && isToRight(newPos, targetArea)
          ? "teleported-through"
          : isBelow(newPos, targetArea)
          ? "too-left"
          : "too-right",
      peakY: Math.max(peakY, newPos.y),
    };
  } else if (isInside(newPos, targetArea)) {
    return {
      isOnTarget: true,
      peakY: Math.max(peakY, newPos.y),
    };
  } else {
    return getIsOnTarget(
      {
        x:
          velocity.x > 0 ? velocity.x - 1 : velocity.x < 0 ? velocity.x + 1 : 0,
        y: velocity.y - 1,
      },
      targetArea,
      newPos,
      Math.max(peakY, newPos.y)
    );
  }
};

export const runChallengeA = (targetArea) => {
  let bestAttempt = null;

  // This is awful, I need to reference my year 10 math textbook
  for (let y = 0; y < 500; y++) {
    for (let x = Math.floor(targetArea.x * 0.1); x < getX2(targetArea); x++) {
      const attempt = getIsOnTarget(newPoint(x, y), targetArea);
      const { isOnTarget, reason, peakY } = attempt;

      if (isOnTarget) {
      }
      if (isOnTarget && (!bestAttempt || peakY > bestAttempt.peakY)) {
        bestAttempt = attempt;
      }
    }
  }

  return bestAttempt?.peakY;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
