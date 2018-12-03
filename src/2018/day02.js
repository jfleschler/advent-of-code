export const solvePart1 = input => {
  input = input.split("\n");

  let twos = 0;
  let threes = 0;

  input.forEach(line => {
    let counts = {};
    [...line].forEach(char => {
      if (counts[char]) {
        counts[char] += 1;
      } else {
        counts[char] = 1;
      }
    });

    let foundTwo = false,
      foundThree = false;
    Object.entries(counts).forEach(([k, v]) => {
      if (v == 2 && !foundTwo) {
        twos++;
        foundTwo = true;
      } else if (v == 3 && !foundThree) {
        foundThree = true;
        threes++;
      }
    });
  });
  return twos * threes;
};

export const solvePart2 = input => {
  input = input.split("\n");

  for (let i = 0; i < input.length; i++) {
    const test = input[i];
    for (let j = 1; j < input.length; j++) {
      const check = input[j];

      if (test !== check) {
        let diff = 0;
        let index = -1;
        for (let t = 0; t < test.length; t++) {
          if (test[t] != check[t]) {
            diff++;
            if (diff > 1) {
              break;
            }
            index = t;
          }
        }
        if (diff === 1) {
          return test.slice(0, index) + test.slice(index + 1, test.length);
        }
      }
    }
  }
};
