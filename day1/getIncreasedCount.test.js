const {
  getIncreasedCount,
  getSlidingWindowIncreasedCount,
} = require("./getIncreasedCount");

describe("getIncreasedCount", () => {
  it("returns the increased count", () => {
    const result = getIncreasedCount([
      199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
    ]);
    expect(result).toEqual(7);
  });
});

describe("getSlidingWindowIncreasedCount", () => {
  it("returns the increased count", () => {
    const result = getSlidingWindowIncreasedCount([
      199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
    ]);
    // A: 607 (N/A - no previous sum)
    // B: 618 (increased)
    // C: 618 (no change)
    // D: 617 (decreased)
    // E: 647 (increased)
    // F: 716 (increased)
    // G: 769 (increased)
    // H: 792 (increased)
    expect(result).toEqual(5);
  });
});
