const R = require("ramda");

const getHasLowerPoint = (input, x, y) => {
  const value = input[y][x];

  for (
    let y2 = Math.max(y - 1, 0);
    y2 <= Math.min(y + 1, input.length - 1);
    y2++
  ) {
    for (
      let x2 = Math.max(x - 1, 0);
      x2 <= Math.min(x + 1, input[y].length - 1);
      x2++
    ) {
      if (x2 === x && y2 === y) continue;

      if (input[y2][x2] < value) return true;
    }
  }
  return false;
};

const runChallengeA = (input) => {
  let count = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const value = input[y][x];
      if (!getHasLowerPoint(input, x, y)) {
        count += value + 1;
      }
    }
  }
  return count;
};

const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

module.exports = { runChallengeA, runChallengeB };
