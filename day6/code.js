const R = require("ramda");

const runDay = (fishList) => {
  fishList.reduce((acc, fish, i) => {
    if (fish > 0) {
      acc[i] = fish - 1;
    } else {
      acc[i] = 6;
      acc.push(8);
    }
    return acc;
  }, fishList);
};

const runChallengeA = (fishList, dayCount) => {
  const cloned = [...fishList];
  for (let day = 0; day < dayCount; day++) {
    runDay(cloned);
  }
  return cloned.length;
};

const runChallengeB = (fishList, dayCount) => {
  const runDayB = R.memoizeWith(R.identity, (day) => {
    const daysRemaining = dayCount - day;
    if (daysRemaining <= 0) {
      return 0;
    }
    return runDayB(day + 7) + runDayB(day + 9) + 1;
  });

  return fishList.reduce((acc, fish) => acc + runDayB(fish) + 1, 0);
};

module.exports = { runChallengeA, runChallengeB };
