import R from "ramda";

const createSectionIterator = (lines) => {
  let index = 0;
  return {
    next: () => {
      let acc = [];
      index++;
      while (index < lines.length && lines[index]) {
        acc.push(lines[index]);
        index++;
      }
      index++;
      return acc.length ? acc : null;
    },
  };
};

export const parseInput = (str) => {
  const lines = str.split("\n");
  const iterator = createSectionIterator(lines);
  const sections = [];
  let next;
  while ((next = iterator.next())) {
    const coords = next
      .map((line) => line.split(","))
      .map((arr) => ({ x: arr[0], y: arr[1], z: arr[2] }));
    sections.push(coords);
  }
  return sections;
};

const rotate = (coords, axis, angleDeg) => {
  const angle = degreesToRadians(angleDeg);

  const rotateX = (coord) => {
    const x = coord.x;
    const y = coord.y * Math.cos(angle) - coord.z * Math.sin(angle);
    const z = coord.y * Math.sin(angle) + coord.z * Math.cos(angle);
    return { x, y, z };
  };
  const rotateY = (coord) => {
    const x = coord.z * Math.sin(angle) + coord.x * Math.cos(angle);
    const y = coord.y;
    const z = coord.z * Math.cos(angle) - coord.x * Math.sin(angle);
    return { x, y, z };
  };
  const rotateZ = (coord) => {
    const x = coord.x * Math.cos(angle) - coord.y * Math.sin(angle);
    const y = coord.x * Math.sin(angle) + coord.y * Math.cos(angle);
    const z = coord.z;
    return { x, y, z };
  };
  const rotateFn = { x: rotateX, y: rotateY, z: rotateZ };
  return R.map(Math.round, rotateFn[axis](coords));
};

const allDegrees = [0, 90, 180, 270];

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// export const _getPossibleCoordinates = (coords) => {
//   const allCoords = allDegrees.flatMap((rotateX) => {
//     const xRotated = rotate(coords, "x", rotateX);
//     return allDegrees.flatMap((rotateY) => {
//       const yRotated = rotate(xRotated, "y", rotateY);
//       return allDegrees.flatMap((rotateZ) => {
//         return {
//           position: rotate(yRotated, "z", rotateZ),
//           rotation: { x: rotateX, y: rotateY, z: rotateZ },
//         };
//       });
//     });
//   });
//   return R.uniqBy(
//     ({ position }) => `${position.x},${position.y},${position.z}`,
//     allCoords
//   );
// };

// const allRotations = _getPossibleCoordinates({ x: 5, y: 6, z: 7 }).map(
//   (i) => i.rotation
// );

const allRotations = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 90 },
  { x: 0, y: 0, z: 180 },
  { x: 0, y: 0, z: 270 },
  { x: 0, y: 90, z: 0 },
  { x: 0, y: 90, z: 90 },
  { x: 0, y: 90, z: 180 },
  { x: 0, y: 90, z: 270 },
  { x: 0, y: 180, z: 0 },
  { x: 0, y: 180, z: 90 },
  { x: 0, y: 180, z: 180 },
  { x: 0, y: 180, z: 270 },
  { x: 0, y: 270, z: 0 },
  { x: 0, y: 270, z: 90 },
  { x: 0, y: 270, z: 180 },
  { x: 0, y: 270, z: 270 },
  { x: 90, y: 0, z: 0 },
  { x: 90, y: 0, z: 90 },
  { x: 90, y: 0, z: 180 },
  { x: 90, y: 0, z: 270 },
  { x: 90, y: 180, z: 0 },
  { x: 90, y: 180, z: 90 },
  { x: 90, y: 180, z: 180 },
  { x: 90, y: 180, z: 270 },
];

const minBeaconsForOverlap = 10;
// 1000 units

export const _getPossibleOverlaps = (scansA, scansB) => {};

export const _getPossibleOverlapsWithRotation = (scansA, scansB) => {};

export const runChallengeA = (input) => {
  // _getPossibleOverlapsWithRotation
  const result = "TODO";
  return result;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
