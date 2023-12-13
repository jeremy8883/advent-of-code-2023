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

const slidingWindowSum = (
  windowLength,
  cb,
  initialVal,
  startIndex,
  str,
  cache,
  cacheKeyPrefix
) => {
  const results = R.repeat(undefined, str.length - windowLength);

  for (let i = startIndex; i <= str.length - windowLength; i++) {
    const cacheKey = `${cacheKeyPrefix}|${i}`;
    if (cache[cacheKey] !== undefined) {
      results[i] = cache[cacheKey];
      break;
    }
    const substr = str.substring(i, i + windowLength);
    try {
      results[i] = cb(
        substr,
        i,
        str.substring(0, i),
        str.substring(i + windowLength)
      );
    } catch (ex) {
      if (ex.code === "BREAK_SLIDE") {
        results[i] = ex.val;
        break;
      } else {
        throw ex;
      }
    }
  }

  // Set cache
  let sum = 0;
  for (let i = str.length - windowLength + 1; i >= startIndex; i--) {
    if (results[i] === undefined) continue;
    sum += results[i];
    cache[`${cacheKeyPrefix}|${i}`] = sum;
  }

  return sum;
};

const breakSlide = (val) =>
  Object.assign(new Error("Break sliding window"), {
    code: "BREAK_SLIDE",
    val,
  });

const findPermutationCount = (
  { report, groupLengths },
  startIndex = 0,
  path = [],
  cache = {}
) => {
  const groupLengthsPartial = groupLengths.slice(path.length);

  return slidingWindowSum(
    groupLengthsPartial[0],
    (val, i, left, right) => {
      // If we hit a `#`, it is guaranteed that we cannot slide further, so we must break
      const breakOrReturn = (count) => {
        if (val[0] === "#") {
          throw breakSlide(count);
        } else {
          return count;
        }
      };

      // Definite no match
      if (val.includes(".")) {
        return breakOrReturn(0);
      }

      if (val[0] === "#" && right[0] === "#") {
        throw breakSlide(0); // Too many in the group, gone too far
      }
      if (val[0] === "?" && right[0] === "#") {
        return 0;
      }

      if (groupLengthsPartial.length > 1) {
        if (i + val.length + 1 >= report.length) {
          throw breakSlide(0); // We have more reported values, but we've hit the end early
        }
        const count = findPermutationCount(
          {
            report,
            groupLengths,
          },
          i + val.length + 1,
          [...path, i],
          cache
        );
        if (!count) {
          return breakOrReturn(0);
        }

        return breakOrReturn(count);
      } else {
        // The result is actually closer to the right
        if (/#/.test(right)) {
          return breakOrReturn(0);
        }

        return breakOrReturn(1);
      }
    },
    0,
    startIndex,
    report,
    cache,
    `${path.length}`
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
