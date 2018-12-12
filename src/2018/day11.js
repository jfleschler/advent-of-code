import { range } from "lodash";

const buildPowerGrid = serialNumber => {
  const grid = Array(300)
    .fill()
    .map(() => Array(300).fill(0));

  range(1, 300).forEach(x => {
    range(1, 300).forEach(y => {
      grid[x][y] =
        calculatePower(x, y, serialNumber) +
        grid[x - 1][y] +
        grid[x][y - 1] -
        grid[x - 1][y - 1];
    });
  });
  return grid;
};

const calculatePower = (x, y, serialNumber) => {
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  powerLevel = Math.floor((powerLevel / 100) % 10);
  powerLevel -= 5;
  return powerLevel;
};

const findMax = (grid, size) => {
  let maxX;
  let maxY;
  let maxPower = 0;
  range(1, 300 - size).forEach(x => {
    range(1, 300 - size).forEach(y => {
      const topLeft = grid[x - 1][y - 1];
      const topRight = grid[x - 1 + size][y - 1];
      const bottomLeft = grid[x - 1][y - 1 + size];
      const bottomRight = grid[x - 1 + size][y - 1 + size];
      const power = topLeft + bottomRight - topRight - bottomLeft;

      if (power > maxPower) {
        maxPower = power;
        maxX = x;
        maxY = y;
      }
    });
  });

  return {
    maxPower,
    maxX,
    maxY
  };
};

export const solvePart1 = input => {
  const grid = buildPowerGrid(Number(input));

  const result = findMax(grid, 3);

  return `${result.maxX},${result.maxY}`;
};

export const solvePart2 = input => {
  const grid = buildPowerGrid(Number(input));

  let bestSolution;
  let maxPower = 0;
  let maxSize = 0;
  range(1, 300).forEach(size => {
    const result = findMax(grid, size);

    if (result.maxPower > maxPower) {
      bestSolution = result;
      maxPower = result.maxPower;
      maxSize = size;
    }
  });

  return `${bestSolution.maxX},${bestSolution.maxY},${maxSize}`;
};
