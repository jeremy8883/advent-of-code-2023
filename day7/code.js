import R from "ramda";
import { leftPad } from "../utils/string.js";
import { reduce } from "../utils/array.js";

export const parseInput = (str) =>
  str
    .split("\n")
    .map(R.split(" "))
    .map((l) => ({ hand: l[0], bid: parseInt(l[1], 10) }));

const scores = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  X: 1,
};

const getCardCounts = R.pipe(
  R.groupBy((c) => c),
  R.toPairs,
  R.map(([card, arr]) => arr.length),
  R.sortBy((i) => i),
  R.reverse
);

const handToStrength = R.pipe(
  R.map((c) => leftPad(2, scores[c])),
  R.join(""),
  (str) => parseInt(str, 10)
);

export const runChallengeA = (input) => {
  const getHandScore = (hand) => {
    const cardCounts = getCardCounts(hand);

    if (cardCounts[0] === 5) {
      return 7;
    } else if (cardCounts[0] === 4) {
      return 6;
    } else if (cardCounts[0] === 3 && cardCounts[1] === 2) {
      return 5;
    } else if (cardCounts[0] === 3) {
      return 4;
    } else if (cardCounts[0] === 2 && cardCounts[1] === 2) {
      return 3;
    } else if (cardCounts[0] === 2) {
      return 2;
    } else {
      return 1;
    }
  };

  const compareHandsA = (lineA, lineB) => {
    const handScoreA = getHandScore(lineA.hand);
    const handScoreB = getHandScore(lineB.hand);

    if (handScoreA !== handScoreB) {
      return handScoreA - handScoreB;
    } else {
      return handToStrength(lineA.hand) - handToStrength(lineB.hand);
    }
  };

  return R.sort(compareHandsA, input).reduce(
    (acc, line, i) => acc + line.bid * (i + 1),
    0
  );
};

export const runChallengeB = (input) => {
  const getHandScore = (hand) => {
    const jCount = hand.split("").filter((c) => c === "X").length;
    const cardCounts = getCardCounts(hand.replace(/X/g, ""));

    if (jCount === 5 || cardCounts[0] + jCount === 5) {
      return 7;
    } else if (cardCounts[0] + jCount === 4) {
      return 6;
    } else if (cardCounts[0] + jCount === 3 && cardCounts[1] === 2) {
      return 5;
    } else if (cardCounts[0] + jCount === 3) {
      return 4;
    } else if (cardCounts[0] === 2 && cardCounts[1] + jCount === 2) {
      return 3;
    } else if (cardCounts[0] + jCount === 2) {
      return 2;
    } else {
      return 1;
    }
  };

  const compareHandsB = (lineA, lineB) => {
    const handScoreA = getHandScore(lineA.hand);
    const handScoreB = getHandScore(lineB.hand);

    if (handScoreA !== handScoreB) {
      return handScoreA - handScoreB;
    } else {
      return handToStrength(lineA.hand) - handToStrength(lineB.hand);
    }
  };

  return R.pipe(
    R.map((l) => ({ ...l, hand: l.hand.replace(/J/g, "X") })),
    R.sort(compareHandsB),
    reduce((acc, line, i) => acc + line.bid * (i + 1), 0)
  )(input);
};
