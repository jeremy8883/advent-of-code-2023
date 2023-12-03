import R from "ramda";

export const parseInput = (str) => {
  const lines = str.split("\n");
  return lines.map((line) => {
    const parts = line.split(": ");
    return parts[1].split("; ").map((s) =>
      Object.fromEntries(
        s
          .split(", ")
          .map((d) => d.split(" "))
          .map(([count, color]) => [color, parseInt(count)])
      )
    );
  });
};

export const runChallengeA = (input) => {
  return input.reduce((acc, sets, index) => {
    if (
      sets.every(
        (s) => (s.red || 0) <= 12 && (s.green || 0) <= 13 && (s.blue || 0) <= 14
      )
    ) {
      return acc + index + 1;
    } else {
      return acc;
    }
  }, 0);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
