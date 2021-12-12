export const parse2dNumberArray = (str) =>
  str.split("\n").map((l) => l.split("").map(Number));
