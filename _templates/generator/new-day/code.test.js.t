---
to: day<%=dayNumber%>/code.test.js
---
import { runChallengeA, runChallengeB } from "./code.js";

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
