import R from "ramda";
import { parseInt10 } from "../utils/number.js";
import {
  addPoints,
  getX2,
  getY2,
  multiplyPoint,
  newPoint,
  newRect,
  newRectByPoints,
} from "../utils/geometry.js";
import { picksTheoremArea } from "./picksTheormeArea.js";

const directionMap = {
  R: newPoint(1, 0),
  D: newPoint(0, 1),
  L: newPoint(-1, 0),
  U: newPoint(0, -1),
};

export const parseInput = (str) =>
  str.split("\n").map((l) => {
    const [direction, amount, color] = l.split(" ");
    return {
      direction: directionMap[direction],
      amount: parseInt10(amount),
      color: color.replace(/[()#]/g, ""),
    };
  });

const instructionsToPolygon = (instructions) => {
  const startPoint = newPoint(0, 0);
  const points = [startPoint];

  for (let i = 0; i < instructions.length; i++) {
    const { direction, amount } = instructions[i];
    const lastPos = R.last(points);

    const nextPoint = addPoints(multiplyPoint(direction, amount), lastPos);
    points.push(nextPoint);
  }

  return points.slice(0, points.length - 1);
};

const getBounds = (points) =>
  points.reduce((acc, val) => {
    return newRectByPoints(
      Math.min(acc.x, val.x),
      Math.min(acc.y, val.y),
      Math.max(getX2(acc), val.x),
      Math.max(getY2(acc), val.y)
    );
  }, newRect(points[0].x, points[0].y, 0, 0));

// Use raycasting to find if a point is inside the polygon, on the edge, or outside
export const isInsidePolygon = (point, polygon) => {
  const x = point.x;
  const y = point.y;

  let inside = false;
  const verticesCount = polygon.length;

  for (let i = 0, j = verticesCount - 1; i < verticesCount; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const onEdge =
      x >= Math.min(xi, xj) &&
      x <= Math.max(xi, xj) &&
      y >= Math.min(yi, yj) &&
      y <= Math.max(yi, yj) &&
      (xj - xi) * (y - yi) === (yj - yi) * (x - xi);

    if (onEdge) {
      return "EDGE";
    }

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside ? "INSIDE" : "OUTSIDE";
};

// Add 1 to the east and south of the polygon.
// I should have looped through each edge, and moved two points at a time, I know. This is a bit weird.
export const makeOneOffCorrection = (polygon) => (point) => {
  const xyInside = isInsidePolygon(addPoints(point, newPoint(1, 1)), polygon);
  const xInside = isInsidePolygon(addPoints(point, newPoint(1, 0)), polygon);
  const yInside = isInsidePolygon(addPoints(point, newPoint(0, 1)), polygon);
  const trInside = isInsidePolygon(addPoints(point, newPoint(1, -1)), polygon);
  const lInside = isInsidePolygon(addPoints(point, newPoint(-1, 0)), polygon);

  // F
  if (xInside === "EDGE" && yInside === "EDGE") {
    return xyInside === "OUTSIDE" ? newPoint(point.x + 1, point.y + 1) : point;
  }
  // L
  if (trInside === "OUTSIDE" && yInside === "INSIDE" && xInside === "EDGE") {
    return addPoints(point, newPoint(1, 0));
  }
  // 7
  if (yInside === "EDGE" && lInside === "EDGE" && xyInside === "INSIDE") {
    return addPoints(point, newPoint(0, 1));
  }

  return newPoint(
    xInside !== "OUTSIDE" ? point.x : point.x + 1,
    yInside !== "OUTSIDE" ? point.y : point.y + 1
  );
};

const makeOneOffCorrections = (polygon) =>
  polygon.map(makeOneOffCorrection(polygon));

export const runChallengeA = R.pipe(
  instructionsToPolygon,
  makeOneOffCorrections,
  picksTheoremArea
);

const directionMapFromColor = {
  0: newPoint(1, 0),
  1: newPoint(0, 1),
  2: newPoint(-1, 0),
  3: newPoint(0, -1),
};

const getInstructionsFromColor = ({ color }) => ({
  direction: directionMapFromColor[color[5]],
  amount: parseInt(color.substring(0, 5), 16),
});

export const runChallengeB = R.pipe(
  R.map(getInstructionsFromColor),
  instructionsToPolygon,
  makeOneOffCorrections,
  picksTheoremArea
);
