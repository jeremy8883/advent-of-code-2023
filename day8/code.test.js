const { runChallengeA, runChallengeB } = require("./code");

const mockInput = [
  {
    uniquePatterns: [
      "be",
      "cfbegad",
      "cbdgef",
      "fgaecd",
      "cgeb",
      "fdcge",
      "agebfd",
      "fecdb",
      "fabcd",
      "edb",
    ],
    output: ["fdgacbe", "cefdb", "cefbgd", "gcbe"],
  },
  {
    uniquePatterns: [
      "edbfga",
      "begcd",
      "cbg",
      "gc",
      "gcadebf",
      "fbgde",
      "acbgfd",
      "abcde",
      "gfcbed",
      "gfec",
    ],
    output: ["fcgedb", "cgb", "dgebacf", "gc"],
  },
  {
    uniquePatterns: [
      "fgaebd",
      "cg",
      "bdaec",
      "gdafb",
      "agbcfd",
      "gdcbef",
      "bgcad",
      "gfac",
      "gcb",
      "cdgabef",
    ],
    output: ["cg", "cg", "fdcagb", "cbg"],
  },
  {
    uniquePatterns: [
      "fbegcd",
      "cbd",
      "adcefb",
      "dageb",
      "afcb",
      "bc",
      "aefdc",
      "ecdab",
      "fgdeca",
      "fcdbega",
    ],
    output: ["efabcd", "cedba", "gadfec", "cb"],
  },
  {
    uniquePatterns: [
      "aecbfdg",
      "fbg",
      "gf",
      "bafeg",
      "dbefa",
      "fcge",
      "gcbea",
      "fcaegb",
      "dgceab",
      "fcbdga",
    ],
    output: ["gecf", "egdcabf", "bgf", "bfgea"],
  },
  {
    uniquePatterns: [
      "fgeab",
      "ca",
      "afcebg",
      "bdacfeg",
      "cfaedg",
      "gcfdb",
      "baec",
      "bfadeg",
      "bafgc",
      "acf",
    ],
    output: ["gebdcfa", "ecba", "ca", "fadegcb"],
  },
  {
    uniquePatterns: [
      "dbcfg",
      "fgd",
      "bdegcaf",
      "fgec",
      "aegbdf",
      "ecdfab",
      "fbedc",
      "dacgb",
      "gdcebf",
      "gf",
    ],
    output: ["cefg", "dcbef", "fcge", "gbcadfe"],
  },
  {
    uniquePatterns: [
      "bdfegc",
      "cbegaf",
      "gecbf",
      "dfcage",
      "bdacg",
      "ed",
      "bedf",
      "ced",
      "adcbefg",
      "gebcd",
    ],
    output: ["ed", "bcgafe", "cdgba", "cbgef"],
  },
  {
    uniquePatterns: [
      "egadfb",
      "cdbfeg",
      "cegd",
      "fecab",
      "cgb",
      "gbdefca",
      "cg",
      "fgcdab",
      "egfdb",
      "bfceg",
    ],
    output: ["gbdfcae", "bgc", "cg", "cgb"],
  },
  {
    uniquePatterns: [
      "gcafb",
      "gcf",
      "dcaebfg",
      "ecagb",
      "gf",
      "abcdeg",
      "gaef",
      "cafbge",
      "fdbac",
      "fegbdc",
    ],
    output: ["fgae", "cfgab", "fg", "bagce"],
  },
];

describe("Day 8: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(26);
  });
});

describe("Day 8: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});
