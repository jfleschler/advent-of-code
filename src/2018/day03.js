export const solvePart1 = input => {
  input = input.split("\n");
  let grid = getGrid(input);

  let squares = 0;
  Object.keys(grid).forEach(key => {
    if (grid[key] > 1) {
      squares++;
    }
  });
  return squares;
};

export const solvePart2 = input => {
  input = input.split("\n");

  let grid = getGrid(input);

  let regex = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;
  const rowWidth = 1000;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // id, left, top, width, height

    let parts = regex.exec(line);
    let start = parseInt(parts[3]) * rowWidth + parseInt(parts[2]);

    let overlapped = false;
    for (let x = 0; x < parseInt(parts[4]); x++) {
      for (let y = 0; y < parseInt(parts[5]); y++) {
        let pos = start + x + y * rowWidth;

        if (grid[pos] !== 1) {
          overlapped = true;
          break;
        }
      }

      if (overlapped) {
        break;
      }
    }

    if (!overlapped) {
      return parseInt(parts[1]);
    }
  }
};

const getGrid = input => {
  let regex = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;

  let grid = {};
  const rowWidth = 1000;

  input.forEach(line => {
    // id, left, top, width, height

    let parts = regex.exec(line);
    let start = parseInt(parts[3]) * rowWidth + parseInt(parts[2]);

    for (let x = 0; x < parseInt(parts[4]); x++) {
      for (let y = 0; y < parseInt(parts[5]); y++) {
        let pos = start + x + y * rowWidth;

        if (grid[pos]) {
          grid[pos]++;
        } else {
          grid[pos] = 1;
        }
      }
    }
  });
  return grid;
};
