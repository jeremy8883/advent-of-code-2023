export const getPosition = (instructions) => {
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

export const getPositionWithAim = (instructions) => {
  return instructions.reduce(
    (acc, { command, amount }) => {
      switch (command) {
        case "forward":
          return {
            pos: acc.pos + amount,
            depth: acc.depth + acc.aim * amount,
            aim: acc.aim,
          };
        case "down":
          return {
            pos: acc.pos,
            depth: acc.depth,
            aim: acc.aim + amount,
          };
        case "up":
          return {
            pos: acc.pos,
            depth: acc.depth,
            aim: acc.aim - amount,
          };
        default:
          throw new Error("Invalid command: " + command);
      }
    },
    { pos: 0, depth: 0, aim: 0 }
  );
};
