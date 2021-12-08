const R = require("ramda");

const runChallengeA = (input) => {
  return R.sum(
    input.map(
      ({ output }) =>
        output.filter((v) => [2, 4, 3, 7].includes(v.length)).length
    )
  );
};

const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

module.exports = { runChallengeA, runChallengeB };
