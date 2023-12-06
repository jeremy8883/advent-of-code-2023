import R from "ramda";

export const parseInput = R.pipe(
  R.split("\n"),
  R.map(
    R.pipe(
      R.split(" "),
      R.filter(Boolean),
      R.tail,
      R.map((n) => parseInt(n, 10))
    )
  ),
  ([times, distances]) => R.zip(times, distances)
);

const findPossibilities = ([time, recordDistance]) => {
  let possibilities = 0;
  for (let holdTime = 1; holdTime < time; holdTime++) {
    if (holdTime * (time - holdTime) > recordDistance) {
      possibilities++;
    }
  }
  return possibilities;
};

export const runChallengeA = (input) => {
  return R.pipe(R.map(findPossibilities), R.product)(input);
};

export const parseInputB = R.pipe(
  R.split("\n"),
  R.map(
    R.pipe(R.split(" "), R.filter(Boolean), R.tail, R.join(""), (n) =>
      parseInt(n, 10)
    )
  )
);

export const runChallengeB = (input) => {
  return findPossibilities(input);
};
