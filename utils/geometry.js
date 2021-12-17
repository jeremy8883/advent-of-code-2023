export const newRect = (x, y, width, height) => ({
  x,
  y,
  width,
  height,
});

export const newRectByPoints = (x, y, x2, y2) => ({
  x: x2 >= x ? x : x2,
  y: y2 >= y ? y : y2,
  width: x2 >= x ? x2 - x : x - x2,
  height: y2 >= y ? y2 - y : y - y2,
});

export const newPoint = (x, y) => ({ x, y });

export const newSize = (width, height) => ({ width, height });

export const pointEquals = (pA, pB) => pA.x === pB.x && pA.y === pB.y;

export const addPoints = (pA, pB) => ({ x: pA.x + pB.x, y: pA.y + pB.y });

export const getX2 = (rect) => rect.x + rect.width;

export const getY2 = (rect) => rect.y + rect.height;

export const isInside = (point, area) =>
  point.x >= area.x &&
  point.y >= area.y &&
  point.x < getX2(area) &&
  point.y < getY2(area);
