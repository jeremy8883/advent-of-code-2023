const { getPosition, getPositionWithAim } = require("./getPosition");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const input = await readInput("day2/input.txt");
  const instructions = input
    .split("\n")
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

  const positionWithAim = getPositionWithAim(instructions);
  console.log(
    "A: Pos: " +
      positionWithAim.pos +
      ", Depth: " +
      positionWithAim.depth +
      ", Total: " +
      positionWithAim.pos * positionWithAim.depth
  );
};

main();
