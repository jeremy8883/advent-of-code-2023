---
to: day<%=dayNumber%>/code.test.js
---
const { runChallengeA, runChallengeB } = require("./code");

const mockInput = [];

describe("Day <%=dayNumber%>: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual("TODO");
  });
});

describe("Day <%=dayNumber%>: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});
