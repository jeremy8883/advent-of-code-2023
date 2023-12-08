import R from "ramda";

export const parseInput = (str) => {
  const lines = str.split("\n");
  return {
    instructions: lines[0],
    nodes: lines.slice(2).reduce((acc, line) => {
      const [key, lr] = line.split(" = ");
      const [L, R] = lr.replace("(", "").replace(")", "").split(", ");
      return { ...acc, [key]: { L, R } };
    }, []),
  };
};

function* iterateInfinite(arr) {
  let index = 0;
  while (true) {
    yield arr[index];
    index = (index + 1) % arr.length;
  }
}

const getPathCount = ({ nodes, instructions }, firstNodeKey, isEnd) => {
  let nextNodeKey = firstNodeKey;
  let count = 0;

  for (const instruction of iterateInfinite(instructions)) {
    nextNodeKey = nodes[nextNodeKey][instruction];

    count++;

    if (isEnd(nextNodeKey)) {
      return count;
    }
  }
};

export const runChallengeA = (input) => {
  return getPathCount(input, "AAA", R.equals("ZZZ"));
};

const getLcm = (arr) =>
  arr.reduce((acc, val) => {
    let x = acc;
    let y = val;

    while (y !== 0) {
      const oldY = y;
      y = x % y;
      x = oldY;
    }

    return (acc * val) / x;
  }, arr[0]);

export const runChallengeB = (input) => {
  return R.pipe(
    Object.keys,
    R.filter(R.endsWith("A")),
    R.map((startKey) => getPathCount(input, startKey, (k) => k.endsWith("Z"))),
    getLcm
  )(input.nodes);
};
