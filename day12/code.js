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

const isPossibilityValid = (report, groupLengths, indexes) => {
  let tempReport = report;
  for (let i = 0; i < groupLengths.length; i++) {
    const section = report.substr(indexes[i], groupLengths[i]);

    tempReport =
      tempReport.substr(0, indexes[i]) +
      section
        .split("")
        .map((c) => "_")
        .join("") +
      tempReport.substr(indexes[i] + groupLengths[i]);
  }
  return !tempReport.includes("#");
};

const findPermutations = (
  { report, groupLengths },
  startIndex = 0,
  path = []
) => {
  const groupLengthsPartial = groupLengths.slice(path.length);
  return slidingWindowReduce(
    groupLengthsPartial[0],
    (acc, val, i, left, right) => {
      // Definite no match
      if (val.includes(".")) {
        if (val[0] === "#") {
          throw breakSlide(acc);
        } else {
          return acc;
        }
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
        const permutations = findPermutations(
          {
            report,
            groupLengths,
          },
          i + val.length + 1,
          [...path, i]
        );
        if (!permutations.length) {
          if (val[0] === "#") {
            throw breakSlide(acc);
          } else {
            return acc;
          }
        }

        const newAcc = [...acc, ...permutations];
        if (val[0] === "#") {
          throw breakSlide(newAcc);
        } else {
          return newAcc;
        }
      } else {
        // The result is actually closer to the right
        if (/#/.test(right)) {
          if (val[0] === "#") {
            throw breakSlide(acc);
          } else {
            return acc;
          }
        }

        // (╯°□°)╯︵ ┻━┻ I didn't want to do this!
        // const newIndexes = [...path, i];
        // if (!isPossibilityValid(report, groupLengths, newIndexes)) {
        //   console.log(report);
        //   throw breakSlide(acc);
        // }
        const newAcc = [...acc, [...path, i]];
        if (val[0] === "#") {
          throw breakSlide(newAcc);
        } else {
          return newAcc;
        }
      }
    },
    [],
    startIndex,
    report
  );
};

export const runChallengeA = R.pipe(
  R.map(findPermutations),
  R.map(R.prop("length")),
  R.sum
);

export const runChallengeB = R.pipe(
  R.map(({ report, groupLengths }) => ({
    report: R.repeat(report, 5).join("?"),
    groupLengths: R.repeat(groupLengths, 5).flat(),
  })),
  R.map(findPermutations),
  R.map(R.prop("length")),
  R.sum
);
