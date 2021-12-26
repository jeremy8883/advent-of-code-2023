import R from "ramda";

export const parseInput = (str) =>
  str
    .split("\n")
    .map((line) => line.split(" "))
    .map(([ins, a, b]) => ({
      ins,
      a,
      b,
    }));

export const _runInstructions = (instructions, modelNumber) => {
  let inpIndex = 0;
  return instructions.reduce(
    (acc, { ins, a, b }) => {
      const valA = acc[a];
      const valB = b != null && !isNaN(b) ? parseInt(b) : acc[b];
      switch (ins) {
        case "inp":
          const res = { ...acc, [a]: parseInt(modelNumber[inpIndex]) };
          inpIndex++;
          return res;
        case "add":
          return { ...acc, [a]: valA + valB };
        case "mul":
          return { ...acc, [a]: valA * valB };
        case "div":
          if (valB === 0) throw new Error("Cannot divide by zero!");
          return { ...acc, [a]: Math.floor(valA / valB) };
        case "mod":
          if (valB === 0) throw new Error("Cannot divide by zero!");
          return { ...acc, [a]: valA % valB };
        case "eql":
          return { ...acc, [a]: valA === valB ? 1 : 0 };
        default:
          throw new Error(`Invalid instruction: ${ins}`);
      }
    },
    { w: 0, x: 0, y: 0, z: 0 }
  );
};

export const runChallengeA = (instructions) => {
  for (
    let modelNumber = 99999999999999;
    modelNumber >= 11111111111111;
    modelNumber--
  ) {
    if (modelNumber % 10000000000000 === 0) {
      return modelNumber;
      // return null;
    }

    const modelNumberStr = `${modelNumber}`;
    if (modelNumberStr.includes("0")) continue;
    const result = _runInstructions(instructions, modelNumberStr);

    if (result.z === 0) {
      return modelNumberStr;
    }
  }
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
