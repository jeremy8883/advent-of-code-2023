import R from "ramda";
import { parseInt10 } from "../utils/number.js";

const splitCondition = (condition) => {
  const [key, operator, num] = condition.match(/\w+|[<>]/g);
  return [key, operator, parseInt10(num)];
};

const toPojo = (str) => {
  const keyValuePairs = str.slice(1, -1).split(",");
  const obj = {};
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    obj[key] = parseInt(value);
  });
  return obj;
};

export const parseInput = (str) => {
  const [workflows, ratings] = R.splitWhen((l) => !l, str.split("\n"));

  return {
    workflows: Object.fromEntries(
      workflows.map((l) => {
        let [name, rules] = l.split("{");
        rules = rules
          .replace("}", "")
          .split(",")
          .map((r) => {
            const [condition, action] = r.split(":");
            return !action
              ? { action: condition }
              : { condition: splitCondition(condition), action };
          });
        return [name, rules];
      })
    ),
    ratings: ratings.filter(Boolean).map(toPojo),
  };
};

const findAction = (workflow, rating) => {
  const result = workflow.find(({ condition }) => {
    if (!condition) return false;

    const [key, operator, num] = condition;
    if (operator === "<") {
      return rating[key] < num;
    } else if (operator === ">") {
      return rating[key] > num;
    }
  });

  return result?.action ?? R.last(workflow).action;
};

const getIsAccepted = (workflows) => (rating) => {
  let nextWorkflow = workflows["in"];
  while (true) {
    const action = findAction(nextWorkflow, rating);
    if (action === "R") {
      return false;
    } else if (action === "A") {
      return true;
    }
    nextWorkflow = workflows[action];
  }
};

export const runChallengeA = ({ workflows, ratings }) => {
  return R.pipe(
    R.filter(getIsAccepted(workflows)),
    R.chain((r) => Object.entries(r).map(([key, val]) => val)),
    R.sum
  )(ratings);
};

const splitRange = (range, at) => [
  [range[0], at - 1],
  [at, range[1]],
];

const splitRangeByCondition = (range, [key, operator, num]) => {
  if (operator === "<") {
    if (num <= range[0]) {
      return { matchRange: range, noMatchRange: null };
    } else if (num > range[1]) {
      return { matchRange: null, noMatchRange: range };
    } else {
      const [matchRange, noMatchRange] = splitRange(range, num);
      return { matchRange, noMatchRange };
    }
  } else if (operator === ">") {
    if (num < range[0]) {
      return { matchRange: null, noMatchRange: range };
    } else if (num >= range[1]) {
      return { matchRange: range, noMatchRange: null };
    } else {
      const [noMatchRange, matchRange] = splitRange(range, num + 1);
      return { matchRange, noMatchRange };
    }
  }
  throw new Error("invalid operator");
};

const getPossibilities = (workflow, rating) => {
  let matchRatings = [];
  let noMatchRatings = [rating];
  let noMatchAction = null;

  for (const { condition, action } of workflow) {
    if (!condition) {
      noMatchAction = action;
      continue;
    }

    const [key, operator, num] = condition;

    noMatchRatings = noMatchRatings.reduce((acc, nmr) => {
      const { matchRange, noMatchRange } = splitRangeByCondition(
        nmr[key],
        condition
      );
      if (matchRange) {
        matchRatings.push({ action, rating: { ...nmr, [key]: matchRange } });
      }
      if (noMatchRange) {
        acc.push({ ...nmr, [key]: noMatchRange });
      }
      return acc;
    }, []);
  }

  noMatchRatings = noMatchRatings.map((rating) => ({
    action: noMatchAction,
    rating,
  }));

  return [...matchRatings, ...noMatchRatings];
};

const getPossibilityCount = R.pipe(
  R.map(
    R.pipe(
      Object.entries,
      R.map(([_, range]) => range[1] - range[0] + 1),
      R.product
    )
  ),
  R.sum
);

const getAcceptedPossibilities = (workflows) => {
  const queue = [];
  queue.push({
    action: "in",
    rating: { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] },
  });
  const accepted = [];

  while (queue.length) {
    const next = queue.shift();
    if (next.action === "R") {
      continue;
    }
    if (next.action === "A") {
      accepted.push(next.rating);
      continue;
    }

    const possibilities = getPossibilities(workflows[next.action], next.rating);
    queue.push(...possibilities);
  }

  return accepted;
};

export const runChallengeB = ({ workflows }) => {
  const accepted = getAcceptedPossibilities(workflows);
  return getPossibilityCount(accepted);
};
