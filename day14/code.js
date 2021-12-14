import R from "ramda";

export const parseInput = (str) => {
  const lines = str.split("\n");
  return {
    template: lines[0],
    insertions: Object.fromEntries(
      R.drop(2, lines).map((l) => l.split(" -> "))
    ),
  };
};

const runInsertions = (insertions, template) => {
  return R.range(0, template.length - 1)
    .reverse()
    .reduce((templ, index) => {
      const toInsert = insertions[`${template[index]}${template[index + 1]}`];
      if (!toInsert) {
        throw new Error(
          `Could not find ${template[index] + template[index + 1]}`
        );
      }

      return templ.slice(0, index + 1) + toInsert + templ.slice(index + 1);
    }, template);
};

export const runChallengeA = (input, stepCount) => {
  const result = R.range(0, stepCount).reduce((template) => {
    return runInsertions(input.insertions, template);
  }, input.template);

  const grouped = R.pipe(
    R.groupBy(R.identity),
    R.toPairs,
    R.map(([letter, arr]) => [letter, arr.length]),
    R.sortBy(R.prop(1))
  )(result);

  const smallest = R.head(grouped);
  const largest = R.last(grouped);

  return largest[1] - smallest[1];
};

export const runChallengeB = (input, stepCount) => {
  // return runChallengeA(input, stepCount);
};
