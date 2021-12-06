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

const runChallengeB = (vectors) => {
  const result = "TODO";
  return result;
};

module.exports = { runChallengeA, runChallengeB };
