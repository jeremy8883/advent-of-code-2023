export const mergeSets = (...sets) => {
  const newSet = new Set();
  for (const s of sets) {
    s.forEach(newSet.add, newSet);
  }
  return newSet;
};
