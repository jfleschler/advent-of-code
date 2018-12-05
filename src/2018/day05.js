const collapsePolymer = input => {
  input = input.trim();

  let stack = [...input];
  for (let i = 0; i < stack.length - 1; i++) {
    const cur = stack[i];
    const next = stack[i + 1];
    if (
      cur !== next &&
      (cur.toUpperCase() === next || next.toUpperCase() === cur)
    ) {
      stack.splice(i, 2);
      i = -1;
    }
  }

  return stack;
};

export const solvePart1 = input => {
  const stack = collapsePolymer(input);
  return stack.length;
};

export const solvePart2 = input => {
  let minLength = 500000;
  for (let i = 10; i < 36; i++) {
    let alpha = i.toString(36);
    let regex = new RegExp(alpha, "gi");
    let testInput = input;
    testInput = testInput.replace(regex, "");

    const length = collapsePolymer(testInput).length;
    if (length < minLength) {
      minLength = length;
    }
  }
  return minLength;
};
