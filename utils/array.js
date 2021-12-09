import R from "ramda";

export const sortAsc = R.sort((a, b) => a - b);

export const sortDesc = R.sort((a, b) => b - a);
