import R from "ramda";
import { sortAsc } from "../utils/array.js";

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

const openingChars = new Set(Object.keys(matchingPairs));

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

const acScores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const getAcScore = (line) => {
  const chars = line.split("");

  const stack = chars.reduce((stack, c) => {
    if (openingChars.has(c)) {
      stack.push(c);
    } else {
      stack.pop();
    }
    return stack;
  }, []);

  return stack
    .reverse()
    .map((openingChar) => matchingPairs[openingChar])
    .reduce((acc, closingChar) => acc * 5 + acScores[closingChar], 0);
};

export const runChallengeB = (input) => {
  const scores = input
    .filter((line) => getCorruptionScore(line) === 0)
    .map(getAcScore);
  return sortAsc(scores)[parseInt(scores.length / 2)];
};
