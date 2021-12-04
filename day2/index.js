const { getPosition } = require("./getPosition");
const { readFile } = require("fs").promises;

const main = async () => {
  const input = await readFile("day2/input.txt");
  const instructions = input
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" "))
    .map(([command, amount]) => ({ command, amount: parseInt(amount) }));

  const position = getPosition(instructions);
  console.log(
    "A: Pos: " +
      position.pos +
      ", Depth: " +
      position.depth +
      ", Total: " +
      position.pos * position.depth
  );
};

main();
