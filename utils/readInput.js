const { readFile } = require("fs").promises;
const R = require("ramda");

const readInput = async (fileName) => {
  const input = await readFile(fileName);
  return input.toString().trim();
};

module.exports = {
  readInput,
};
