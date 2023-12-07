export const filterStringByRegex = (inputString, regexPattern) => {
  const matches = inputString.match(regexPattern);

  if (!matches) {
    return "";
  }

  return inputString
    .split("")
    .filter((char) => matches.includes(char))
    .join("");
};

export const leftPad = (length, str) =>
  "0".repeat(Math.max(0, length - `${str}`.length)) + `${str}`;
