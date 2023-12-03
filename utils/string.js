export const filterStringByRegex = (inputString, regexPattern) => {
  const matches = inputString.match(regexPattern);

  if (!matches) {
    return '';
  }

  return inputString.split('').filter(char => matches.includes(char)).join('');
};
