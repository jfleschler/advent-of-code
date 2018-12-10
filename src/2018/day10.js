import { minBy, maxBy } from "lodash";

const print = (lights, dims) => {
  let str = "";
  for (let y = dims.minY; y <= dims.maxY; y++) {
    for (let x = dims.minX; x <= dims.maxX; x++) {
      str += lights.some(l => l.x === x && l.y === y) ? "*" : " ";
    }
    str += "\n";
  }
  console.log(str);
};

export const solvePart1 = input => {
  input = input.split("\n");

  const regex = /<(\W*-*[0-9]+), (\W*-*[0-9]+)> velocity=<(\W*-*[0-9]+), (\W*-*[0-9]+)/;
  let lights = [];
  input.forEach(l => {
    const [, x, y, vX, vY] = regex.exec(l).map(Number);
    lights.push({
      x,
      y,
      vX,
      vY
    });
  });

  let area = Infinity;
  for (let i = 0; i < Infinity; i++) {
    // make the lights move!
    const newLights = lights.map(l => {
      return {
        x: l.x + l.vX,
        y: l.y + l.vY,
        vX: l.vX,
        vY: l.vY
      };
    });

    // find the new min/max
    const minX = minBy(newLights, l => l.x).x;
    const maxX = maxBy(newLights, l => l.x).x;
    const minY = minBy(newLights, l => l.y).y;
    const maxY = maxBy(newLights, l => l.y).y;

    // calculate the new area and dimensions
    let newArea = (maxX - minX) * (maxY - minY);
    const dims = {
      maxY,
      minY,
      maxX,
      minX
    };

    // if our area has grown, we're done.  Print the previous iteration
    if (newArea >= area) {
      print(lights, dims);
      console.log(`Total time: ${i}`);
      break;
    }

    // update the running area and lights
    lights = newLights;
    area = newArea;
  }
};

export const solvePart2 = input => {};
