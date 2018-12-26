let registers = [0, 0, 0, 0];

const operations = {
  addr: (a, b, c) => {
    registers[c] = registers[a] + registers[b];
  },
  addi: (a, b, c) => {
    registers[c] = registers[a] + b;
  },
  mulr: (a, b, c) => {
    registers[c] = registers[a] * registers[b];
  },
  muli: (a, b, c) => {
    registers[c] = registers[a] * b;
  },
  banr: (a, b, c) => {
    registers[c] = registers[a] & registers[b];
  },
  bani: (a, b, c) => {
    registers[c] = registers[a] & b;
  },
  borr: (a, b, c) => {
    registers[c] = registers[a] | registers[b];
  },
  bori: (a, b, c) => {
    registers[c] = registers[a] | b;
  },
  setr: (a, b, c) => {
    registers[c] = registers[a];
  },
  seti: (a, b, c) => {
    registers[c] = a;
  },
  gtir: (a, b, c) => {
    registers[c] = a > registers[b] ? 1 : 0;
  },
  gtri: (a, b, c) => {
    registers[c] = registers[a] > b ? 1 : 0;
  },
  gtrr: (a, b, c) => {
    registers[c] = registers[a] > registers[b] ? 1 : 0;
  },
  eqir: (a, b, c) => {
    registers[c] = a === registers[b] ? 1 : 0;
  },
  eqri: (a, b, c) => {
    registers[c] = registers[a] === b ? 1 : 0;
  },
  eqrr: (a, b, c) => {
    registers[c] = registers[a] === registers[b] ? 1 : 0;
  }
};

const arraysEqual = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const solvePart1 = input => {
  let result = 0;

  input = input.split("\n");
  input.forEach((line, idx) => {
    if (line.includes("Before")) {
      const before = JSON.parse(line.match(/Before: (.*)/)[1]);
      const inst = input[idx + 1].split(" ").map(Number);
      const after = JSON.parse(input[idx + 2].match(/After: (.*)/)[1]);

      let count = 0;
      Object.keys(operations).forEach(op => {
        registers = [...before];
        operations[op](inst[1], inst[2], inst[3]);

        if (arraysEqual(registers, after)) {
          count++;
        }
      });

      if (count >= 3) {
        result++;
      }
    }
  });
  return result;
};

export const solvePart2 = input => {
  const opcodes = Array(16)
    .fill()
    .map(() => Array(0));

  let endOfTestData = -1;
  input = input.split("\n");
  input.forEach((line, idx) => {
    if (line.includes("Before")) {
      const before = JSON.parse(line.match(/Before: (.*)/)[1]);
      const inst = input[idx + 1].split(" ").map(Number);
      const after = JSON.parse(input[idx + 2].match(/After: (.*)/)[1]);

      Object.keys(operations).forEach(op => {
        registers = [...before];
        operations[op](inst[1], inst[2], inst[3]);

        if (arraysEqual(registers, after) && !opcodes[inst[0]].includes(op)) {
          opcodes[inst[0]].push(op);
        }
      });
      endOfTestData = idx + 3;
    }
  });

  while (!foundAllOpcodes(opcodes)) {
    const foundOpcodes = opcodes.filter(op => op.length === 1).map(op => op[0]);
    foundOpcodes.forEach(found => {
      opcodes.forEach(arr => {
        if (arr.length > 1) {
          const index = arr.indexOf(found);
          if (index !== -1) {
            arr.splice(index, 1);
          }
        }
      });
    });
  }

  // trim off the test data
  input.splice(0, endOfTestData + 3);

  // clear the registers just in case
  registers = [0, 0, 0, 0];
  input.forEach(line => {
    const inst = line.split(" ").map(Number);

    const op = opcodes[inst[0]][0];
    console.log(op, inst[1], inst[2], inst[3]);
    operations[op](inst[1], inst[2], inst[3]);
  });

  return registers[0];
};

const foundAllOpcodes = opcodes => {
  let done = true;
  opcodes.forEach(op => {
    if (op.length > 1) {
      done = false;
    }
  });
  return done;
};
