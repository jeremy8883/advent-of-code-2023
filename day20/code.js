import R from "ramda";

export const parseInput = (str) =>
  Object.fromEntries(
    str.split("\n").map((line) => {
      const [module, outNames] = line.split(" -> ");
      return [
        module.replace(/[%&]/g, ""),
        {
          name: module.replace(/[%&]/g, ""),
          operator: module[0],
          dests: outNames.split(", "),
          state: module[0] === "b" ? null : false,
        },
      ];
    })
  );

const processInput = (module, signals) => {
  if (module.operator === "b") {
    if (signals.length > 1) {
      throw new Error("too many signals?");
    }

    return {
      newState: null,
      nextActions: module.dests.map((dest) => ({
        signal: signals[0],
        dest,
      })),
    };
  } else if (module.operator === "%") {
    if (signals.length > 1) {
      throw new Error("too many signals?");
    }

    if (signals[0] === true) {
      return [];
    } else {
      return {
        newState: !module.state,
        nextActions: module.dests.map((dest) => ({
          signal: !module.state,
          dest,
        })),
      };
    }
  } else if (module.operator === "&") {
    return {
      newState: signals.every((signal) => !!signal),
      nextActions: module.dests.map((dest) => ({
        // TODO WTF?
        signal: !signals.every((signal) => !!signal),
        dest,
      })),
    };
  } else {
    throw new Error("Invalid operator: " + module.operator);
  }
};

export const runChallengeA = (modules) => {
  const queue = new Map();
  queue.set("broadcaster", { signals: [false], dest: "broadcaster" });

  const nextQueue = new Map();

  while (queue.length) {
    const next = queue.shift();
    const { newState, nextActions } = processInput(
      modules[next.dest],
      next.signals
    );
    modules[next.dest].state = newState;
    for (const nextAction of nextActions) {
      if (nextQueue.has(nextAction.dest)) {
        nextQueue.get(nextAction.dest).signals.push(nextAction.signal);
      } else {
        nextQueue.set(nextAction.dest, {
          signals: [nextAction.signal],
          dest: nextAction.dest,
        });
      }
    }
  }

  return result;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
