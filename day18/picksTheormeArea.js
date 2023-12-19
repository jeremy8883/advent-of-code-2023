// Euclidean algorithm to find greatest common divisor (gcd)
const gcdEuclidean = (a, b) => (b === 0 ? a : gcdEuclidean(b, a % b));

const countBoundaryLatticePoints = (poly) => {
  let boundaryPoints = 0;
  const n = poly.length;

  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = poly[i];
    const { x: x2, y: y2 } = poly[(i + 1) % n];

    // Calculate the greatest common divisor (gcd) to count lattice points on the edge
    const gcd = Math.abs(gcdEuclidean(x2 - x1, y2 - y1));

    boundaryPoints += gcd;
  }

  return boundaryPoints;
};

const latticePointsWithinPolygonCount = (points, boundaryPoints) => {
  // Calculate the area of the polygon using the shoelace formula
  let area = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = points[i];
    const { x: x2, y: y2 } = points[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }

  area = Math.abs(area / 2);

  return Math.floor(area - boundaryPoints / 2 + 1);
};

/**
 * Taken with the help of chatgpt, I won't lie. I now know what pick's theorem is though!
 */
export const picksTheoremArea = (points) => {
  let boundaryPoints = countBoundaryLatticePoints(points);
  let interiorPoints = latticePointsWithinPolygonCount(points, boundaryPoints);

  // Pick's theorem: A = I + B/2 - 1
  return Math.abs(interiorPoints + boundaryPoints / 2 - 1);
};
