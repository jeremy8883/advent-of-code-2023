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

const mergeCounts = R.mergeWith(R.add);

const countPairs = (
  pair,
  insertions,
  pairCountCache,
  depthCount,
  currentDepth = 0
) => {
  const levelsRemaining = depthCount - currentDepth;
  const toInsert = insertions[pair];
  if (!toInsert) {
    throw new Error(`Could not find ${pair}`);
  }

  if (pairCountCache[pair][currentDepth]) {
    return pairCountCache[pair][currentDepth];
  } else if (levelsRemaining === 0) {
    return {
      [pair[0]]: 1,
    };
  } else {
    let counts = {};
    const leftPair = `${pair[0]}${toInsert}`;
    const rightPair = `${toInsert}${pair[1]}`;
    counts = mergeCounts(
      counts,
      countPairs(
        leftPair,
        insertions,
        pairCountCache,
        depthCount,
        currentDepth + 1
      )
    );
    counts = mergeCounts(
      counts,
      countPairs(
        rightPair,
        insertions,
        pairCountCache,
        depthCount,
        currentDepth + 1
      )
    );

    pairCountCache[pair][currentDepth] = counts;

    return counts;
  }
};

const buildGraph = ({ template, insertions }, depthCount) => {
  const pairCountCache = R.map(() => ({}), insertions); // Mutable
  const counts = R.dropLast(1, template.split("")).reduce(
    (acc, firstLetter, index) => {
      const pair = `${firstLetter}${template[index + 1]}`;
      return mergeCounts(
        acc,
        countPairs(pair, insertions, pairCountCache, depthCount)
      );
    },
    {}
  );

  return mergeCounts(counts, { [R.last(template)]: 1 });
};

export const runChallengeB = (input, depthCount) => {
  const graph = buildGraph(input, depthCount);

  const sorted = R.pipe(
    R.toPairs,
    R.map(([letter, count]) => [letter, count]),
    R.sortBy(R.prop(1))
  )(graph);

  const smallest = R.head(sorted);
  const largest = R.last(sorted);

  return largest[1] - smallest[1];
};
