import R from "ramda";

export const parseInput = (str) => str.split("\n");

const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const matchingPairs = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const openingChars = new Set(["(", "[", "{", "<"]);

const getCorruptionScore = (line) => {
  const chars = line.split("");

  const stack = [];
  for (const c of chars) {
    if (openingChars.has(c)) {
      stack.push(c);
    } else {
      if (matchingPairs[R.last(stack)] === c) {
        stack.pop();
      } else {
        return scores[c];
      }
    }
  }

  return 0;
};

export const runChallengeA = (input) => {
  return R.sum(input.map(getCorruptionScore));
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
