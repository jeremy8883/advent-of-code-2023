import R from "ramda";

const safeStringify = R.pipe(
  Object.entries,
  R.sortBy(([key]) => key),
  Object.fromEntries,
  JSON.stringify
);

export class ObjectSet {
  constructor(getKey) {
    this._getKey = getKey;
    this.items = new Map();
  }

  add(item) {
    this.items.set(this.getKey(item), item);
  }

  delete(item) {
    this.items.delete(this.getKey(item));
  }

  has(item) {
    return this.items.has(this.getKey(item));
  }

  get size() {
    return this.items.size;
  }

  clear() {
    this.items.clear();
  }

  values() {
    return Array.from(this.items.values());
  }

  getKey(obj) {
    if (this._getKey) {
      return this._getKey;
    }

    return (
      typeof obj + "_" + (typeof obj === "object" ? safeStringify(obj) : obj)
    );
  }

  [Symbol.iterator]() {
    let values = Array.from(this.items.values());
    let index = 0;

    return {
      next: () => {
        if (index < values.length) {
          return { value: values[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}
