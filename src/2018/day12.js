import { range } from "lodash";

const buildRules = input => {
  const rules = new Map();

  input.forEach(line => {
    const rule = /([.#]+) => ([.#])/.exec(line);
    if (rule) {
      rules.set(rule[1], rule[2]);
    }
  });
  return rules;
};

const sumPlants = state => {
  return [...state].reduce((acc, cur, i) => {
    if (cur === "#") {
      acc += i - 10;
    }
    return acc;
  }, 0);
};

export const solvePart1 = input => {
  input = input.split("\n");

  let state =
    ".........." +
    input[0].replace("initial state: ", "") +
    "........................................................................";

  const rules = buildRules(input);
  range(0, 20).forEach(gen => {
    let currentGen = "";
    [...state].forEach((c, i) => {
      const L2 = state[i - 2] || ".";
      const L1 = state[i - 1] || ".";
      const R1 = state[i + 1] || ".";
      const R2 = state[i + 2] || ".";

      const key = `${L2}${L1}${state[i]}${R1}${R2}`;
      const newVal = rules.get(key) || ".";
      currentGen += newVal;

      if (i === state.length - 1 && newVal === "#") {
        currentGen += ".....";
      }
    });

    state = currentGen;
  });
  console.log(state);
  return sumPlants(state);
};

export const solvePart2 = input => {
  input = input.split("\n");

  let state =
    ".........." +
    input[0].replace("initial state: ", "") +
    "........................................................................";

  const rules = buildRules(input);
  let prevSum = 0;
  let prevDiff = 0;
  let sum = 0;
  for (let gen = 0; gen < 1000; gen++) {
    let currentGen = "";
    [...state].forEach((c, i) => {
      const L2 = state[i - 2] || ".";
      const L1 = state[i - 1] || ".";
      const R1 = state[i + 1] || ".";
      const R2 = state[i + 2] || ".";

      const key = `${L2}${L1}${state[i]}${R1}${R2}`;
      const newVal = rules.get(key) || ".";
      currentGen += newVal;

      if (i === state.length - 1 && newVal === "#") {
        currentGen += ".....";
      }
    });
    let currentSum = sumPlants(state);

    const diff = currentSum - prevSum;

    if (prevDiff === diff) {
      sum = currentSum + (50000000000 - gen) * diff;
      break;
    }

    prevDiff = diff;
    prevSum = currentSum;
    state = currentGen;
  }
  console.log(state);
  return sum;
};
