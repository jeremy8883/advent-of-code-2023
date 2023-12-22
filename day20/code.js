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
        },
      ];
    })
  );

const getPossibleInputs = (name, modules) => {
  return Object.entries(modules)
    .filter(([_, m]) => m.dests.includes(name))
    .map(([key, m]) => m.name);
};

const initStates = (modules) => {
  return R.pipe(
    Object.entries,
    R.map(([name, module]) => {
      return module.operator === "%"
        ? [name, { ...module, state: false }]
        : module.operator === "&"
        ? [
            name,
            {
              ...module,
              state: Object.fromEntries(
                getPossibleInputs(module.name, modules).map((name) => [
                  name,
                  false,
                ])
              ),
            },
          ]
        : [name, { ...module, state: null }];
    }),
    Object.fromEntries
  )(modules);
};

const processInput = (module, signal, from) => {
  if (module.operator === "b") {
    return {
      newState: null,
      nextActions: module.dests.map((dest) => ({
        from: module.name,
        signal: signal,
        dest,
      })),
    };
  } else if (module.operator === "%") {
    if (signal === true) {
      return {
        newState: module.state,
        nextActions: [],
      };
    } else {
      return {
        newState: !module.state,
        nextActions: module.dests.map((dest) => ({
          from: module.name,
          signal: !module.state,
          dest,
        })),
      };
    }
  } else if (module.operator === "&") {
    const newState = { ...module.state, [from]: signal };
    return {
      newState,
      nextActions: module.dests.map((dest) => ({
        from: module.name,
        signal: !Object.values(newState).every((signal) => signal),
        dest,
      })),
    };
  } else {
    throw new Error("Invalid operator: " + module.operator);
  }
};

export const runChallengeA = (modules, pressCount = 1000) => {
  modules = initStates(modules);

  let lowSignalCount = 0;
  let highSignalCount = 0;

  for (let i = 0; i < pressCount; i++) {
    const queue = [];
    queue.push({
      from: "button",
      signal: false,
      dest: "broadcaster",
    });

    while (queue.length) {
      const thisItem = queue.shift();
      if (thisItem.signal) {
        highSignalCount++;
      } else {
        lowSignalCount++;
      }
      if (!modules[thisItem.dest]) {
        continue;
      }

      const { newState, nextActions } = processInput(
        modules[thisItem.dest],
        thisItem.signal,
        thisItem.from
      );
      modules[thisItem.dest].state = newState;
      queue.push(...nextActions);
    }
  }

  return lowSignalCount * highSignalCount;
};

export const runChallengeB = (modules) => {
  modules = initStates(modules);

  let hasHitRx = false;
  let count = 0;

  while (!hasHitRx) {
    const queue = [];
    queue.push({
      from: "button",
      signal: false,
      dest: "broadcaster",
    });
    count++;

    while (queue.length) {
      const thisItem = queue.shift();

      if (thisItem.dest === "rx" && !thisItem.signal) {
        console.log(thisItem);
        hasHitRx = true;
        break;
      }

      if (!modules[thisItem.dest]) {
        continue;
      }

      const { newState, nextActions } = processInput(
        modules[thisItem.dest],
        thisItem.signal,
        thisItem.from
      );
      modules[thisItem.dest].state = newState;
      queue.push(...nextActions);
    }
  }

  return count;
};
