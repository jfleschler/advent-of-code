import { minBy, maxBy, range } from "lodash";

const buildLand = input => {
  input = input.trim().split("\n");

  const clay = input.map(line => {
    const [, xStart, xEnd] = /x=(\d+)[.]*(\d*)/.exec(line).map(Number);
    const [, yStart, yEnd] = /y=(\d+)[.]*(\d*)/.exec(line).map(Number);
    return {
      x: {
        start: xStart,
        end: (xEnd || xStart) + 1
      },
      y: {
        start: yStart,
        end: (yEnd || yStart) + 1
      }
    };
  });

  const minX = minBy(clay, c => c.x.start).x.start - 1;
  const maxX = maxBy(clay, c => c.x.end).x.end + 1;
  const maxY = maxBy(clay, c => c.y.end).y.end + 1;

  const land = Array(maxY)
    .fill()
    .map(() => Array(maxX - minX).fill("."));

  clay.forEach(c => {
    range(c.x.start - minX, c.x.end - minX).forEach(x => {
      range(c.y.start, c.y.end).forEach(y => {
        land[y][x] = "#";
      });
    });
  });

  return { land, minX };
};

const drop = (waterX, waterY, land) => {
  while (true) {
    if (waterX >= land[0].length || waterY >= land.length - 1) return;

    if (land[waterY + 1][waterX] === "#" || land[waterY + 1][waterX] === "~") {
      const { ledgeLeft, left, ledgeRight, right } = scan(waterX, waterY, land);

      if (ledgeLeft) {
        // console.log("dropLeft");
        drop(left - 1, waterY, land);
      }
      if (ledgeRight) {
        // console.log("dropRight");
        drop(right + 1, waterY, land);
      }
      if (!ledgeLeft && !ledgeRight) {
        // console.log("waterRising");

        waterY -= 1;
      } else {
        return;
      }
    } else if (land[waterY + 1][waterX] === "|") {
      land[waterY][waterX] = "|";
      return;
    } else {
      land[waterY][waterX] = "|";
      waterY += 1;
    }
  }
};

const scan = (waterX, waterY, land, isBottom = true) => {
  let ledgeLeft = false,
    ledgeRight = false;

  let left = waterX;
  while (land[waterY][left - 1] !== "#" && left >= 0) {
    // check if we reached a ledge
    if (
      land[waterY + 1][left] === "#" &&
      land[waterY + 1][left - 1] !== "#" &&
      land[waterY + 1][left - 1] !== "~"
    ) {
      ledgeLeft = true;
      break;
    }

    left -= 1;
  }

  let right = waterX;
  while (land[waterY][right] !== "#" && right < land[0].length) {
    // check if we reached a ledge
    if (
      land[waterY + 1][right] === "#" &&
      land[waterY + 1][right + 1] !== "#" &&
      land[waterY + 1][right + 1] !== "~"
    ) {
      ledgeRight = true;
      break;
    }
    right += 1;
  }

  range(left, right).forEach(x => {
    land[waterY][x] = ledgeLeft || ledgeRight ? "|" : "~";
  });

  if (ledgeRight) {
    land[waterY][right] = "|";
  }
  return { ledgeLeft, left, ledgeRight, right };
};

export const solvePart1 = input => {
  const { land, minX } = buildLand(input);

  // add the spring
  const water = { x: 500 - minX, y: 0 };
  land[water.y][water.x] = "+";
  // print(land);
  drop(water.x, water.y + 1, land);

  let waterCount = 0;
  land.forEach(row => {
    row.forEach(cell => {
      if (cell === "|" || cell === "~") {
        waterCount++;
      }
    });
  });
  print(land);

  // console.log(land);
  return waterCount;
};

export const solvePart2 = input => {
  const { land, minX } = buildLand(input);

  // add the spring
  const water = { x: 500 - minX, y: 0 };
  land[water.y][water.x] = "+";
  // print(land);
  drop(water.x, water.y + 1, land);

  let waterCount = 0;
  land.forEach(row => {
    row.forEach(cell => {
      if (cell === "~") {
        waterCount++;
      }
    });
  });
  print(land);

  // console.log(land);
  return waterCount;
};

const print = land => {
  const width = land[0].length;
  const height = land.length - 1;

  let out = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      out += land[y][x];
    }
    out += "\n";
  }
  console.log(out);
};
