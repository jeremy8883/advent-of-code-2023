import R from "ramda";
import { parseInt10 } from "../utils/number.js";

const splitCondition = (condition) => {
  const [key, operator, num] = condition.match(/\w+|[<>]/g);
  return [key, operator, parseInt10(num)];
};

const toPojo = (str) => {
  let keyValuePairs = str.slice(1, -1).split(",");
  let obj = {};
  keyValuePairs.forEach((pair) => {
    let [key, value] = pair.split("=");
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

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
