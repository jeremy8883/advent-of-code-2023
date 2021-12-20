import R from "ramda";
import {
  getSize,
  gridToString,
  logGrid,
  map2d,
  newGrid,
  reduce2d,
  reduceRect,
} from "../utils/2d.js";
import { addSize, newRect, newSize } from "../utils/geometry.js";

export const parseInput = (str) => {
  const lines = str.split("\n");
  return {
    enhancement: lines[0],
    inputImage: R.drop(2, lines).map((l) => l.split("")),
  };
};

const getEnhancedPixel = (enhancement, inputImage, x, y, oobPixel) => {
  const bits = reduceRect(
    (acc, x, y) => {
      const val = inputImage[y]?.[x] ?? oobPixel;
      return acc + (val === "." ? "0" : "1");
    },
    "",
    newRect(x - 2, y - 2, 3, 3)
  );
  return enhancement[parseInt(bits, 2)];
};

export const enhanceImage = ({ enhancement, inputImage }, oobPixel) => {
  const enhancedSize = addSize(getSize(inputImage), newSize(2, 2));

  return R.pipe(
    newGrid("."),
    map2d((_, x, y) =>
      getEnhancedPixel(enhancement, inputImage, x, y, oobPixel)
    )
  )(enhancedSize);
};

export const runChallengeA = ({ enhancement, inputImage }) => {
  let oobPixel = ".";
  return R.pipe(
    R.reduce((acc) => {
      const result = enhanceImage({ enhancement, inputImage: acc }, oobPixel);
      oobPixel = oobPixel === "." ? enhancement[0] : enhancement[511];
      return result;
    }, inputImage),
    reduce2d((acc, pixel) => acc + (pixel === "#" ? 1 : 0), 0)
  )(R.range(0, 2));
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
