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
const isLowerCase = (val) => val === val.toLowerCase();

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

const hasVisitedASmallCaveTwice = (visited) => {
  return (
    Object.keys(visited)
      .filter(isLowerCase)
      .filter((c) => (visited[c] || 0) > 1).length > 0
  );
};

const findPathsB = (caveLinkMap, path = ["start"], visited = { start: 1 }) => {
  const cave = R.last(path);
  const linkedCaves = caveLinkMap[cave];

  if (cave === "end") {
    return [path];
  } else {
    const nextCaves = linkedCaves.filter((linkedCave) => {
      if (linkedCave === "start") return false;
      return (
        isUpperCase(linkedCave) ||
        !visited[linkedCave] ||
        !hasVisitedASmallCaveTwice(visited)
      );
    });
    if (nextCaves.length === 0) {
      return [];
    } else {
      return nextCaves
        .flatMap((nextCave) =>
          findPathsB(caveLinkMap, [...path, nextCave], {
            ...visited,
            [nextCave]: (visited[nextCave] || 0) + 1,
          })
        )
        .filter((p) => p.length > 0);
    }
  }
};

export const runChallengeB = (caveLinkMap) => {
  const result = findPathsB(caveLinkMap);
  return result.length;
};
