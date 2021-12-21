import R from "ramda";

const boardLength = 10;

export const parseInput = (str) =>
  str
    .split("\n")
    .map((l) => l.split(" "))
    .map(R.last)
    .map(Number);

const createDie = () => {
  let prevValue = 99;

  return {
    roll: () => {
      prevValue = (prevValue + 1) % 100;
      return prevValue + 1;
    },
  };
};

const playTurn = (die, player) => {
  const result = die.roll() + die.roll() + die.roll();
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
  const die = createDie();
  const players = initPlayers(startPositions);
  let rollCount = 0;
  while (true) {
    for (let i = 0; i < players.length; i++) {
      players[i] = playTurn(die, players[i]);
      rollCount += 3;
      if (players[i].score >= 1000) {
        return players[i === 0 ? 1 : 0].score * rollCount;
      }
    }
  }
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
