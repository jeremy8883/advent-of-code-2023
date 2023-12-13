import R from "ramda";
import { parseInt10 } from "../utils/number.js";

export const parseInput = (str) =>
  str.split("\n").map((l) => {
    const [report, groupLengths] = l.split(" ");
    return {
      report,
      groupLengths: groupLengths.split(",").map(parseInt10),
    };
  });

const slidingWindowReduce = (windowLength, cb, initialVal, startIndex, str) => {
  let acc = initialVal;
  for (let i = startIndex; i <= str.length - windowLength; i++) {
    const substr = str.substring(i, i + windowLength);
    try {
      acc = cb(
        acc,
        substr,
        i,
        str.substring(0, i),
        str.substring(i + windowLength)
      );
    } catch (ex) {
      if (ex.code === "BREAK_SLIDE") {
        acc = ex.acc;
        break;
      } else {
        throw ex;
      }
    }
  }
  return acc;
};

const breakSlide = (acc) =>
  Object.assign(new Error("Break sliding window"), {
    code: "BREAK_SLIDE",
    acc,
  });

const findPermutationCount = (
  { report, groupLengths },
  startIndex = 0,
  path = []
) => {
  const groupLengthsPartial = groupLengths.slice(path.length);

  return slidingWindowReduce(
    groupLengthsPartial[0],
    (acc, val, i, left, right) => {
      // If we hit a `#`, it is guaranteed that we cannot slide further, so we must break
      const breakOrReturn = (newAcc) => {
        if (val[0] === "#") {
          throw breakSlide(newAcc);
        } else {
          return newAcc;
        }
      };

      // Definite no match
      if (val.includes(".")) {
        return breakOrReturn(acc);
      }

      if (val[0] === "#" && right[0] === "#") {
        throw breakSlide(acc); // Too many in the group, gone too far
      }
      if (val[0] === "?" && right[0] === "#") {
        return acc;
      }

      if (groupLengthsPartial.length > 1) {
        if (i + val.length + 1 >= report.length) {
          throw breakSlide(acc); // We have more reported values, but we've hit the end early
        }
        const count = findPermutationCount(
          {
            report,
            groupLengths,
          },
          i + val.length + 1,
          [...path, i]
        );
        if (!count) {
          return breakOrReturn(acc);
        }

        return breakOrReturn(acc + count);
      } else {
        // The result is actually closer to the right
        if (/#/.test(right)) {
          return breakOrReturn(acc);
        }

        return breakOrReturn(acc + 1);
      }
    },
    0,
    startIndex,
    report
  );
};

export const runChallengeA = R.pipe(R.map(findPermutationCount), R.sum);

export const runChallengeB = R.pipe(
  R.map(({ report, groupLengths }) => ({
    report: R.repeat(report, 5).join("?"),
    groupLengths: R.repeat(groupLengths, 5).flat(),
  })),
  R.map(findPermutationCount),
  R.sum
);
