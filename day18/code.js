import R from "ramda";

export const parseInput = (str) => str.split("\n").map(JSON.parse);

const _getMostNestedPath = (value, path = []) => {
  const [a, b] = value;

  const aPath = Array.isArray(a) ? _getMostNestedPath(a, [...path, 0]) : path;
  const bPath = Array.isArray(b) ? _getMostNestedPath(b, [...path, 1]) : path;

  return aPath.length >= bPath.length ? aPath : bPath;
};

export const _depthCount = (value) => {
  return _getMostNestedPath(value).length + 1;
};

export const _getLeftDigitPath = (path, value) => {
  const leftPath = R.dropLastWhile(R.equals(0), path);
  if (!leftPath.length) return null;

  leftPath[leftPath.length - 1] = 0;

  while (Array.isArray(R.path(leftPath, value))) {
    leftPath.push(1);
  }

  return leftPath;
};

export const _getRightDigitPath = (path, value) => {
  const rightPath = R.dropLastWhile(R.equals(1), path);
  if (!rightPath.length) return null;

  rightPath[rightPath.length - 1] = 1;

  while (Array.isArray(R.path(rightPath, value))) {
    rightPath.push(0);
  }

  return rightPath;
};

const _findPathWhere = (predicate, value, path = []) => {
  const [a, b] = value;

  if (!Array.isArray(a)) {
    if (predicate(a)) return [...path, 0];
  } else {
    const result = _findPathWhere(predicate, a, [...path, 0]);
    if (result) return result;
  }

  if (!Array.isArray(b)) {
    if (predicate(b)) return [...path, 1];
  } else {
    const result = _findPathWhere(predicate, b, [...path, 1]);
    if (result) return result;
  }

  return null;
};

const _snailfishReduce = (rootValue) => {
  // Explode!
  if (_depthCount(rootValue) > 4) {
    const path = _getMostNestedPath(rootValue);
    const [a, b] = R.path(path, rootValue);
    const leftDigitPath = _getLeftDigitPath(path, rootValue);
    const leftValue = leftDigitPath && R.path(leftDigitPath, rootValue);
    const rightDigitPath = _getRightDigitPath(path, rootValue);
    const rightValue = rightDigitPath && R.path(rightDigitPath, rootValue);

    let newValue = rootValue;
    if (leftDigitPath) {
      newValue = R.assocPath(leftDigitPath, leftValue + a, newValue);
    }
    if (rightDigitPath) {
      newValue = R.assocPath(rightDigitPath, rightValue + b, newValue);
    }
    newValue = R.assocPath(path, 0, newValue);

    return _snailfishReduce(newValue);
  }

  // Split!
  const pathWithGte10 = _findPathWhere((v) => v >= 10, rootValue);
  if (pathWithGte10) {
    const get10Value = R.path(pathWithGte10, rootValue);
    const newValue = R.assocPath(
      pathWithGte10,
      [Math.floor(get10Value / 2), Math.ceil(get10Value / 2)],
      rootValue
    );
    return _snailfishReduce(newValue);
  }

  return rootValue;
};

const _snailfishAdd = (a, b) => {
  if (a == null) return b;
  const added = [a, b];

  return _depthCount(added) > 4 ? _snailfishReduce(added) : added;
};

const _getMagnitude = (value) => {
  const [a, b] = value;

  return (
    (Array.isArray(a) ? _getMagnitude(a) : a) * 3 +
    (Array.isArray(b) ? _getMagnitude(b) : b) * 2
  );
};

export const runChallengeA = (input) => {
  const result = input.reduce(_snailfishAdd);
  return _getMagnitude(result);
};

export const runChallengeB = (input) => {
  let largestMag = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue;
      const result = _snailfishAdd(input[i], input[j]);
      largestMag = Math.max(_getMagnitude(result), largestMag);
    }
  }
  return largestMag;
};
