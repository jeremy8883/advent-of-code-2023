import R from "ramda";

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

const getWinners = (boards) => {
  return boards.reduce((acc, board, index) => {
    const winningRow = board.find((row) => row.every((cell) => cell.isChecked));
    if (winningRow) {
      return [...acc, index];
    }

    const winningColumn = findByColumn(board, (column) =>
      column.every((cell) => cell.isChecked)
    );
    if (winningColumn) {
      return [...acc, index];
    }

    return acc;
  }, []);
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

export const playBingo = (calledNumbers, boards) => {
  let newBoards = prepBoards(boards);

  for (const calledNumber of calledNumbers) {
    newBoards = mapBoards(newBoards, (cell) =>
      cell.number === calledNumber ? { ...cell, isChecked: true } : cell
    );

    const winningBoardIndexes = getWinners(newBoards);

    if (winningBoardIndexes.length) {
      return {
        winner: winningBoardIndexes[0],
        score: getScore(newBoards[winningBoardIndexes[0]], calledNumber),
      };
    }
  }

  throw new Error("Nobody won!");
};

export const playBingoAndLose = (calledNumbers, boards) => {
  let newBoards = prepBoards(boards);

  for (const calledNumber of calledNumbers) {
    newBoards = mapBoards(newBoards, (cell) =>
      cell.number === calledNumber ? { ...cell, isChecked: true } : cell
    );

    const winningBoardIndexes = getWinners(newBoards);

    if (winningBoardIndexes.length === boards.length - 1) {
      const losingBoardIndex = newBoards.findIndex(
        (board, index) => !winningBoardIndexes.includes(index)
      );

      const { score } = playBingo(calledNumbers, [
        boards[losingBoardIndex],
        boards[losingBoardIndex].map((row) =>
          row.map((cell) => 999999999999999)
        ),
      ]);
      return {
        winner: losingBoardIndex,
        score,
      };
    }

    if (winningBoardIndexes.length === boards.length) {
      throw new Error("There was more than one loser!");
    }

    if (winningBoardIndexes.length > boards.length) {
      throw new Error("This shouldn't happen...");
    }
  }

  throw new Error("Nobody won!");
};
