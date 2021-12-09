import R from "ramda";

export const getIncreasedCount = (readings) => {
  let lastValue = null;
  return R.reduce(
    (acc, val) => {
      if (lastValue == null) {
        lastValue = val;
        return acc;
      }

      const hasIncreased = val > lastValue;

      lastValue = val;

      return hasIncreased ? acc + 1 : acc;
    },
    0,
    readings
  );
};

const windowSize = 3;

export const getSlidingWindowIncreasedCount = (readings) => {
  const summedReadings = R.range(0, readings.length - windowSize + 1).map(
    (i) => {
      return R.pipe(R.slice(i, i + windowSize), R.sum)(readings);
    }
  );

  return getIncreasedCount(summedReadings);
};
