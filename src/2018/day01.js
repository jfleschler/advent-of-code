export const solvePart1 = input => {
  input = input.split("\n");
  return input.map(Number).reduce((acc, val) => acc + val, 0);
};

export const solvePart2 = input => {
  input = input.split("\n").map(Number);

  const results = [0];
  let acc = 0;

  for (let i = 0; i < input.length; i++) {
    acc += input[i];
    if (results.indexOf(acc) !== -1) {
      return acc;
    }

    results.push(acc);
    if (i == input.length - 1) {
      i = -1;
    }
  }
};
