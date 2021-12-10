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
