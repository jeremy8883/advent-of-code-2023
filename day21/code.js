import R from "ramda";

const boardLength = 10;

export const parseInput = (str) =>
  str
    .split("\n")
    .map((l) => l.split(" "))
    .map(R.last)
    .map(Number);

const createDeterministicDie = () => {
  let prevValue = 99;

  return {
    roll: () => {
      prevValue = (prevValue + 1) % 100;
      return prevValue + 1;
    },
  };
};

const playTurn = (roll, player) => {
  const roll1 = roll();
  const roll2 = roll();
  const roll3 = roll();
  const result = roll1 + roll2 + roll3;
  const newPosition = ((player.position + result - 1) % boardLength) + 1;

  return {
    ...player,
    score: player.score + newPosition,
    position: newPosition,
  };
};

const initPlayers = (startPositions) =>
  startPositions.map((position) => ({
    position,
    score: 0,
  }));

export const runChallengeA = (startPositions) => {
  const die = createDeterministicDie();
  const players = initPlayers(startPositions);
  let rollCount = 0;
  while (true) {
    for (let i = 0; i < players.length; i++) {
      players[i] = playTurn(die.roll, players[i]);
      rollCount += 3;
      if (players[i].score >= 1000) {
        return players[i === 0 ? 1 : 0].score * rollCount;
      }
    }
  }
};

const addWins = (a, b) => [a[0] + b[0], a[1] + b[1]];

const possibleRolls = R.range(0, 3)
  .map((i) =>
    R.range(0, 3).map((j) => R.range(0, 3).map((k) => [i + 1, j + 1, k + 1]))
  )
  .flat()
  .flat();

const createDiceByList = (values) => {
  let lastIndex = values.length - 1;
  return () => {
    lastIndex = (lastIndex + 1) % values.length;
    return values[lastIndex];
  };
};

const winningScore = 21;

const countWinsRaw = (players) => {
  let theseWins = [0, 0];
  for (const quantumRoll1 of possibleRolls) {
    const player1 = playTurn(createDiceByList(quantumRoll1), players[0]);
    if (player1.score >= winningScore) {
      theseWins[0] += 1;
      continue;
    }
    for (const quantumRoll2 of possibleRolls) {
      const player2 = playTurn(createDiceByList(quantumRoll2), players[1]);
      if (player2.score >= winningScore) {
        theseWins[1] += 1;
      } else {
        theseWins = addWins(theseWins, countWins([player1, player2]));
      }
    }
  }

  return theseWins;
};

const countWins = R.memoizeWith(
  (players) => players.map((p) => `${p.score},${p.position}`).join("-"),
  countWinsRaw
);

export const runChallengeB = (startPositions) => {
  const players = initPlayers(startPositions);
  const result = countWins(players);

  return Math.max(...result);
};
