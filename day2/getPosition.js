const getPosition = (instructions) => {
  return instructions.reduce(
    (acc, { command, amount }) => {
      switch (command) {
        case "forward":
          return { pos: acc.pos + amount, depth: acc.depth };
        case "down":
          return { pos: acc.pos, depth: acc.depth + amount };
        case "up":
          return { pos: acc.pos, depth: acc.depth - amount };
        default:
          throw new Error("Invalid command: " + command);
      }
    },
    { pos: 0, depth: 0 }
  );
};

module.exports = {
  getPosition,
};
