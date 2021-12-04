const { readFile } = require("fs").promises;

const readInput = async (fileName) => {
  const input = await readFile(fileName);
  return input.toString().split("\n").filter(Boolean);
};

module.exports = {
  readInput,
};
