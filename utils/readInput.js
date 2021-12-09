import fs from "fs";
const { readFile } = fs.promises;

export const readInput = async (fileName) => {
  const input = await readFile(fileName);
  return input.toString().trim();
};
