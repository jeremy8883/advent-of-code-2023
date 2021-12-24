export const parse2dNumberArray = (str) =>
  str.split("\n").map((l) => l.split("").map(Number));

export const parse2dCharArray = (str) =>
  str.split("\n").map((l) => l.split(""));
