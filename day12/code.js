import R from "ramda";

export const parseInput = (str) =>
  str.split("\n").reduce((acc, line) => {
    const [a, b] = line.split("-");
    return {
      ...acc,
      [a]: acc[a] ? [...acc[a], b] : [b],
      [b]: acc[b] ? [...acc[b], a] : [a],
    };
  }, {});

const isUpperCase = (val) => val === val.toUpperCase();

const findPaths = (
  caveLinkMap,
  path = ["start"],
  visited = new Set(["start"])
) => {
  const cave = R.last(path);
  const linkedCaves = caveLinkMap[cave];

  if (cave === "end") {
    return [path];
  } else {
    const nextCaves = linkedCaves.filter(
      (linkedCave) => isUpperCase(linkedCave) || !visited.has(linkedCave)
    );
    if (nextCaves.length === 0) {
      return [];
    } else {
      return nextCaves
        .flatMap((nextCave) =>
          findPaths(
            caveLinkMap,
            [...path, nextCave],
            new Set([...visited, nextCave])
          )
        )
        .filter((p) => p.length > 0);
    }
  }
};

export const runChallengeA = (caveLinkMap) => {
  return findPaths(caveLinkMap).length;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
