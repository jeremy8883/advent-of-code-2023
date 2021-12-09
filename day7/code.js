import R from "ramda";

export const runChallengeA = (crabs) => {
  const minPos = Math.min(...crabs);
  const maxPos = Math.max(...crabs);

  const distances = R.range(minPos, maxPos + 1).map((pos) => {
    return R.sum(crabs.map((crab) => Math.abs(pos - crab)));
  });

  return Math.min(...distances);
};

export const runChallengeB = (crabs) => {
  const minPos = Math.min(...crabs);
  const maxPos = Math.max(...crabs);

  const distances = R.range(minPos, maxPos + 1).map((pos) => {
    return R.sum(
      crabs.map((crab) => {
        const distance = Math.abs(pos - crab);

        return (distance * (distance + 1)) / 2;
      })
    );
  });

  return Math.min(...distances);
};
