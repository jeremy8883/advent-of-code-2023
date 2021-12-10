import { newRect } from "./geometry.js";
import { reduce2dSubsection } from "./2d.js";

describe("reduce2dSubsection", () => {
  it("reduces over a subsection", () => {
    const result = reduce2dSubsection(
      (acc, value, x, y) => `${acc}\n${value}, ${x}, ${y}`,
      ``,
      newRect(1, 2, 2, 2),
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]
    );
    expect(result).toEqual(`
10, 1, 2
11, 2, 2
14, 1, 3
15, 2, 3`);
  });

  it("does not fail the subsection goes past the bounds of the grid", () => {
    const result = reduce2dSubsection(
      (acc, value, x, y) => `${acc}\n${value}, ${x}, ${y}`,
      ``,
      newRect(1, 2, 5, 5),
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]
    );
    expect(result).toEqual(`
10, 1, 2
11, 2, 2
12, 3, 2
14, 1, 3
15, 2, 3
16, 3, 3`);
  });
});
