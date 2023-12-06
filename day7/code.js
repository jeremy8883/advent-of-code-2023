import R from "ramda";

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
};

const getHandScore = (hand) => {
  const cardCounts = R.pipe(
    R.groupBy((c) => c),
    R.toPairs,
    R.map(([card, arr]) => arr.length),
    R.sortBy((i) => i),
    R.reverse
  )(hand);

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

const leftPad = (length, str) =>
  "0".repeat(Math.max(0, length - `${str}`.length)) + `${str}`;

const handToStrength = R.pipe(
  R.map((c) => leftPad(2, scores[c])),
  R.join(""),
  (str) => parseInt(str, 10)
);

const compareHands = (lineA, lineB) => {
  const handScoreA = getHandScore(lineA.hand);
  const handScoreB = getHandScore(lineB.hand);

  if (handScoreA !== handScoreB) {
    return handScoreA - handScoreB;
  } else {
    return handToStrength(lineA.hand) - handToStrength(lineB.hand);
  }
};

export const runChallengeA = (input) => {
  return R.sort(compareHands, input).reduce(
    (acc, line, i) => acc + line.bid * (i + 1),
    0
  );
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
