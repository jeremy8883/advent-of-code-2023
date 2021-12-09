import R from "ramda";
import { readInput } from "../utils/readInput.js";
import { playBingo, playBingoAndLose } from "./playBingo.js";

const main = async () => {
  const lines = (await readInput("day4/input.txt")).split("\n");
  const calledNumbers = lines[0].split(",");

  const boards = lines.slice(1).reduce((acc, line) => {
    if (line === "") {
      acc.push([]);
      return acc;
    }

    const lastBoard = R.last(acc);
    lastBoard.push(line.split(" ").filter(Boolean));

    return acc;
  }, []);

  const results = playBingo(calledNumbers, boards);
  console.log(JSON.stringify(results));

  const loserResults = playBingoAndLose(calledNumbers, boards);
  console.log(JSON.stringify(loserResults));
};

main();
