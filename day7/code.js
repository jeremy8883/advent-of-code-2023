import R from "ramda";
import { leftPad } from "../utils/string.js";
import { reduce } from "../utils/array.js";
import { parseInt10 } from "../utils/number.js";

export const parseInput = (str) =>
  str
    .split("\n")
    .map(R.split(" "))
    .map((l) => ({ hand: l[0], bid: parseInt10(l[1]) }));

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

const getHandScore = (hand) => {
  const jCount = hand.split("").filter((c) => c === "X").length;
  const cardCounts = getCardCounts(hand.replace(/X/g, ""));

  return jCount === 5 || cardCounts[0] + jCount === 5
    ? 7
    : cardCounts[0] + jCount === 4
    ? 6
    : cardCounts[0] + jCount === 3 && cardCounts[1] === 2
    ? 5
    : cardCounts[0] + jCount === 3
    ? 4
    : cardCounts[0] === 2 && cardCounts[1] + jCount === 2
    ? 3
    : cardCounts[0] + jCount === 2
    ? 2
    : 1;
};

const handToStrength = R.pipe(
  R.map((c) => leftPad(2, scores[c])),
  R.join(""),
  parseInt10
);

const compareHands = (lineA, lineB) => {
  const diff = getHandScore(lineA.hand) - getHandScore(lineB.hand);

  return diff !== 0
    ? diff
    : handToStrength(lineA.hand) - handToStrength(lineB.hand);
};

export const runChallengeA = R.pipe(
  R.sort(compareHands),
  reduce((acc, line, i) => acc + line.bid * (i + 1), 0)
);

export const runChallengeB = R.pipe(
  R.map((l) => ({ ...l, hand: l.hand.replace(/J/g, "X") })),
  R.sort(compareHands),
  reduce((acc, line, i) => acc + line.bid * (i + 1), 0)
);
