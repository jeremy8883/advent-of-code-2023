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

export const runChallengeA = (input) => {
  const { nodes, instructions } = input;
  let nextNodeKey = "AAA";
  let count = 0;

  for (const instruction of iterateInfinite(instructions)) {
    nextNodeKey = nodes[nextNodeKey][instruction];

    count++;

    if (nextNodeKey === "ZZZ") {
      return count;
    }
  }
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
