export const newRect = (x, y, width, height) => ({
  x,
  y,
  width,
  height,
});

export const newRectByPoints = (x, y, x2, y2) => ({
  x,
  y,
  width: x + x2,
  height: y + y2,
});

export const newPoint = (x, y) => ({ x, y });

export const pointEquals = (pA, pB) => pA.x === pB.x && pA.y === pB.y;
