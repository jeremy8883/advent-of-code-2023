import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  find2dSubsection,
  getHNeighbours,
  getVNeighbours,
  gridToString,
  map2dSubsection,
  reduce2d,
} from "../utils/2d.js";
import { newPoint, newRect, newRectByPoints } from "../utils/geometry.js";

const sideRoomXPoses = {
  A: 3,
  B: 5,
  C: 7,
  D: 9,
};

const amphipodCosts = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

export const parseInput = parse2dCharArray;

const isAmphipod = (char) => ["A", "B", "C", "D"].includes(char);

export const _getAllAmphipods = (board) => {
  return reduce2d(
    (acc, char, x, y) => {
      return isAmphipod(char) ? [...acc, { x, y }] : acc;
    },
    [],
    board
  );
};

export const _getIsInSideRoom = (pos, board) => {
  return getHNeighbours(pos, board).every(({ x, y }) => board[y][x] === "#");
};

const _getCanStandInHallway = (pos, board) => {
  return getVNeighbours(pos, board).every(({ x, y }) => board[y][x] === "#");
};

const _getIsInFinalPosition = (pos, board) => {
  const char = board[pos.y][pos.x];
  if (pos.x !== sideRoomXPoses[char]) return false;
  if (!_getIsInSideRoom(pos, board)) return false; // check probably not needed
  const otherChar = find2dSubsection(
    (c) => c !== char,
    newRectByPoints(pos.x, pos.y + 1, pos.x + 1, board.length - 1),
    board
  );
  return !otherChar;
};

const getOutOfSideRoom = (pos, board) => {
  const nextPos = newPoint(pos.x, pos.y - 1);
  if (nextPos < 0) throw new Error("Exited side room too far");

  const nextChar = board[nextPos.y][nextPos.x];
  if (isAmphipod(nextChar)) {
    return null;
  } else if (nextChar === "#") {
    return pos;
  } else if (nextChar === ".") {
    return getOutOfSideRoom(nextPos, board);
  } else {
    throw new Error(`Unknown character ${nextChar}`);
  }
};

const getHallwayEntryMoves = (pos, board, xDirection, acc = []) => {
  if (_getCanStandInHallway(pos, board)) {
    acc.push(pos);
  }

  const nextPos = newPoint(pos.x + xDirection, pos.y);
  const nextChar = board[nextPos.y][nextPos.x];

  if (isAmphipod(nextChar) || nextChar === "#") {
    return acc;
  } else if (nextChar === ".") {
    return getHallwayEntryMoves(nextPos, board, xDirection, acc);
  } else {
    throw new Error(`Unknown character ${nextChar}`);
  }
};

const _getIsSideRoomClear = (amphipodChar, board) => {
  const x = sideRoomXPoses[amphipodChar];
  const blockage = find2dSubsection(
    (char) => ![".", amphipodChar].includes(char),
    newRectByPoints(x, 2, x + 1, board.length - 1),
    board
  );
  return !blockage;
};

const _moveDownHallway = (pos, targetX, board, isFirst = true) => {
  if (!isFirst && board[pos.y][pos.x] !== ".") {
    // console.log("can't move down hallway", pos, gridToString(board));
    return null;
  }

  const diffX = targetX - pos.x;
  if (diffX === 0) return pos;
  const direction = diffX < 0 ? -1 : 1;
  return _moveDownHallway(
    newPoint(pos.x + direction, pos.y),
    targetX,
    board,
    false
  );
};

const _enterSideRoom = (pos, board) => {
  const newPos = newPoint(pos.x, pos.y + 1);
  const newChar = board[newPos.y][newPos.x];
  if (newChar !== ".") {
    return _getIsInSideRoom(pos, board) ? pos : null;
  } else {
    return _enterSideRoom(newPos, board);
  }
};

export const _getAvailableMovesForAmphipod = (pos, board) => {
  if (_getIsInSideRoom(pos, board)) {
    if (_getIsInFinalPosition(pos, board)) return []; // Check not really needed, since done earlier
    const hallwayPos = getOutOfSideRoom(pos, board);
    if (hallwayPos == null) return [];

    return [
      ...getHallwayEntryMoves(hallwayPos, board, -1),
      ...getHallwayEntryMoves(hallwayPos, board, 1),
    ];
  } else {
    // is in hallway
    const amphipodChar = board[pos.y][pos.x];
    if (!_getIsSideRoomClear(amphipodChar, board)) return [];
    const targetX = sideRoomXPoses[amphipodChar];
    const sideRoomEntry = _moveDownHallway(pos, targetX, board);
    if (!sideRoomEntry) return [];
    return [_enterSideRoom(sideRoomEntry, board)] || [];
  }
};

export const _getAllLiveAmphipodPositions = (board) =>
  reduce2d(
    (acc, char, x, y) => {
      return isAmphipod(char) && !_getIsInFinalPosition({ x, y }, board)
        ? [...acc, { x, y }]
        : acc;
    },
    [],
    board
  );

export const _moveAmphipod = (from, to, board) => {
  const char = board[from.y][from.x];
  return R.pipe(
    // I'm lazy and tired
    map2dSubsection(() => ".", newRect(from.x, from.y, 1, 1)),
    map2dSubsection(() => char, newRect(to.x, to.y, 1, 1))
  )(board);
};

export const _getCost = (from, to, board) => {
  const xDiff = Math.abs(to.x - from.x);
  const yDiff = Math.abs(to.y - from.y);
  const char = board[from.y][from.x];
  if (!isAmphipod(char)) throw new Error("Not an amphipod!");

  return (xDiff + yDiff) * amphipodCosts[char];
};

export const _play = (board, cost = 0, bestCost = { bestCost: Infinity }) => {
  // console.log(gridToString(board));

  if (bestCost.bestCost < cost) return null;

  const amphipodPositions = _getAllLiveAmphipodPositions(board);

  if (!amphipodPositions.length) {
    if (cost < bestCost.bestCost) {
      bestCost.bestCost = cost;
    }
    return cost; // Game complete!
  }

  const moves = amphipodPositions.flatMap((pos) =>
    _getAvailableMovesForAmphipod(pos, board).map((to) => ({ from: pos, to }))
  );
  if (moves.length === 0) {
    // Game lost
    return null;
  }

  const costs = moves
    .map(({ from, to }) => {
      const newBoard = _moveAmphipod(from, to, board);
      const newCost = _getCost(from, to, board);
      return _play(newBoard, cost + newCost, bestCost);
    })
    .filter((cost) => cost != null);

  if (!costs.length) return null;

  // console.log(costs);

  return Math.min(...costs);
};

export const runChallengeA = (board) => {
  return _play(board);
};

export const runChallengeB = (board) => {
  const unfoldedBoard = [
    ...board.slice(0, 3),
    "  #D#C#B#A#".split(""),
    "  #D#B#A#C#".split(""),
    ...board.slice(3),
  ];
  return _play(unfoldedBoard);
};
