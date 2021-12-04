const { readFile } = require("fs").promises;
const R = require("ramda");

const readInput = async (fileName) => {
  const input = await readFile(fileName);
  const lines = input.toString().split("\n");

  return R.last(lines) == "" ? R.init(lines) : lines;
};

module.exports = {
  readInput,
};
