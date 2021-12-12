import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput1 = parseInput(
  `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`
);

const mockInput2 = parseInput(
  `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`
);

describe("Day 12: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput1);
    expect(result).toEqual(19);
  });

  it("gets the result for a larger set", () => {
    const result = runChallengeA(mockInput2);
    expect(result).toEqual(226);
  });
});

describe("Day 12: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput1);
    expect(result).toEqual("TODO");
  });
});
