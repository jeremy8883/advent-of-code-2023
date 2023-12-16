import R from "ramda";
import { flatMap, map } from "../utils/array.js";
import { parseInt10 } from "../utils/number.js";

export const parseInput = (str) => str.split(",");

const getHash = R.reduce(
  (acc, val) => ((acc + val.charCodeAt(0)) * 17) % 256,
  0
);

export const runChallengeA = R.pipe(R.map(getHash), R.sum);

const prepareBoxes = R.reduce(
  (acc, val) => {
    if (val.includes("=")) {
      let [label, focalLength] = val.split("=");
      focalLength = parseInt10(focalLength);
      const boxIndex = getHash(label);
      const box = acc[boxIndex];

      const existingIndex = box.findIndex((item) => item.label === label);
      if (existingIndex !== -1) {
        box[existingIndex] = { label, focalLength };
      } else {
        box.push({ label, focalLength });
      }
    } else if (val.includes("-")) {
      const label = val.replace("-", "");
      const boxIndex = getHash(label);
      acc[boxIndex] = acc[boxIndex].filter((item) => item.label !== label);
    } else {
      throw new Error("invalid input: " + val);
    }
    return acc;
  },
  R.repeat(null, 256).map(() => [])
);

const findFocalPowers = flatMap((box, index) =>
  R.pipe(map((val, i) => (index + 1) * (i + 1) * val.focalLength))(box)
);

export const runChallengeB = R.pipe(prepareBoxes, findFocalPowers, R.sum);
