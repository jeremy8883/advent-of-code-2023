const R = require("ramda");

const mapBoards = (boards, callback) =>
  boards.map((board) => board.map((row) => row.map((cell) => callback(cell))));

const prepBoards = (boards) =>
  mapBoards(boards, (number) => ({ number, isChecked: false }));

const findByColumn = (board, predicate) => {
  for (let x = 0; x < board[0].length; x++) {
    const column = [];
    for (let y = 0; y < board.length; y++) {
      column.push(board[y][x]);
    }
    if (predicate(column)) {
      return column;
    }
  }
};

const getWinner = (boards) => {
  return boards.findIndex((board) => {
    const winningRow = board.find((row) => row.every((cell) => cell.isChecked));
    if (winningRow) {
      return true;
    }

    const winningColumn = findByColumn(board, (column) =>
      column.every((cell) => cell.isChecked)
    );
    if (winningColumn) {
      return true;
    }

    return false;
  });
};

const getScore = (board, lastCalledNumber) => {
  return (
    R.sum(
      board
        .flat()
        .filter((cell) => !cell.isChecked)
        .flatMap((cell) => cell.number)
    ) * lastCalledNumber
  );
};

const playBingo = (calledNumbers, boards) => {
  let newBoards = prepBoards(boards);

  for (const calledNumber of calledNumbers) {
    newBoards = mapBoards(newBoards, (cell) =>
      cell.number === calledNumber ? { ...cell, isChecked: true } : cell
    );

    const winningBoardIndex = getWinner(newBoards);

    if (winningBoardIndex !== -1) {
      return {
        winner: winningBoardIndex,
        score: getScore(newBoards[winningBoardIndex], calledNumber),
      };
    }
  }

  throw new Error("Nobody won!");
};

module.exports = { playBingo };
