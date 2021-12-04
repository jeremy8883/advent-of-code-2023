const { decodeDiagnostics } = require("./decodeDiagnostics");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const diagnostics = await readInput("day3/input.txt");

  const decoded = decodeDiagnostics(diagnostics);
  console.log(JSON.stringify(decoded));
};

main();
