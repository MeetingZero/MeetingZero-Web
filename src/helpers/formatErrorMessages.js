const snakeToPhrase = (string) => {
  let final = '';

  const stringParts = string.split("_");

  for (let i = 0; i < stringParts.length; i++) {
    final += `${stringParts[i].charAt(0).toUpperCase()}${stringParts[i].slice(1)}`;

    if (i < stringParts.length && i > 0) {
      final += ' ';
    }
  }

  return final;
}

export const createErrorString = (errObj) => {
  let final = '';

  for (let field in errObj) {
    final += `${snakeToPhrase(field)} ${errObj[field]}`;
  }

  return final;
}