import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`
);

describe("Day 25: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(54);
  });
});

describe("Day 25: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});
