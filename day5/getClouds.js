const R = require("ramda");

const markPoint = (grid, pos) => {
  if (grid[pos.x] == undefined) {
    grid[pos.x] = [];
  }
  grid[pos.x][pos.y] = (grid[pos.x][pos.y] || 0) + 1;
};

const getIsHorizontal = (vector) => {
  return vector.every((v) => vector[0][1] === v[1]);
};

const getIsVertical = (vector) => {
  return vector.every((v) => vector[0][0] === v[0]);
};

const drawHorizontalLine = (grid, vector) => {
  const normalised = R.sortBy((v) => v[0], vector);

  for (let x = normalised[0][0]; x <= normalised[1][0]; x++) {
    markPoint(grid, { x: x, y: normalised[0][1] });
  }
};

const drawVerticalLine = (grid, vector) => {
  const normalised = R.sortBy((v) => v[1], vector);

  for (let y = normalised[0][1]; y <= normalised[1][1]; y++) {
    markPoint(grid, { x: normalised[0][0], y });
  }
};

const drawSmoke = (grid, v) => {
  if (!getIsHorizontal(v) && !getIsVertical(v)) {
    return grid;
  }

  if (getIsHorizontal(v)) {
    drawHorizontalLine(grid, v);
  } else {
    drawVerticalLine(grid, v);
  }

  return grid;
};

const countGrid = (grid, gridSize, callback) => {
  let count = 0;
  for (let x = 0; x < gridSize.width; x++) {
    for (let y = 0; y < gridSize.height; y++) {
      count += callback(grid[x]?.[y], { x, y }) ? 1 : 0;
    }
  }
  return count;
};

function getGridSize(vectors) {
  return {
    width:
      R.apply(
        Math.max,
        vectors.flatMap(([pos1, pos2]) => [pos1[0], pos2[0]])
      ) + 1,
    height:
      R.apply(
        Math.max,
        vectors.flatMap(([pos1, pos2]) => [pos1[1], pos2[1]])
      ) + 1,
  };
}

const getClouds = (vectors) => {
  const gridSize = getGridSize(vectors);

  const grid = vectors.reduce(drawSmoke, []);

  // console.log(grid);

  return countGrid(grid, gridSize, (c) => c > 1);
};

const drawDiagonalLine = (grid, vector) => {
  const normalised = R.sortBy((v) => v[0], vector);

  const isGoingUp = normalised[0][1] < normalised[1][1];
  let y = normalised[0][1];
  for (let x = normalised[0][0]; x <= normalised[1][0]; x++) {
    markPoint(grid, { x: x, y: isGoingUp ? y++ : y-- });
  }
};

const drawSmokeWithDiagonals = (grid, v) => {
  if (getIsHorizontal(v)) {
    drawHorizontalLine(grid, v);
  } else if (getIsVertical(v)) {
    drawVerticalLine(grid, v);
  } else {
    drawDiagonalLine(grid, v);
  }

  return grid;
};

const getCloudsWithDiagonals = (vectors) => {
  const gridSize = getGridSize(vectors);

  const grid = vectors.reduce(drawSmokeWithDiagonals, []);

  // console.log(grid);

  return countGrid(grid, gridSize, (c) => c > 1);
};

module.exports = { getClouds, getCloudsWithDiagonals };
