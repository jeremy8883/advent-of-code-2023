export const mergeSets = (...sets) => {
  const newSet = new Set();
  for (const s of sets) {
    s.forEach(newSet.add, newSet);
  }
  return newSet;
};

export const addToSet = (set, item) => {
  const newSet = new Set(set);
  newSet.add(item);

  return newSet;
};
