import { maxBy, minBy, countBy, sumBy } from "lodash";

const getPoints = input => {
  input = input.split("\n");
  return input.map((line, idx) => {
    const regex = /([0-9]+), ([0-9]+)/;
    const point = regex.exec(line);
    return {
      id: idx,
      x: parseInt(point[1]),
      y: parseInt(point[2]),
      distances: []
    };
  });
};

const getDistance = (pt1, pt2) => {
  return Math.abs(pt1.x - pt2.x) + Math.abs(pt1.y - pt2.y);
};

const buildGrid = points => {
  const width = maxBy(points, p => p.x).x + 1;
  const height = maxBy(points, p => p.y).y + 1;

  const grid = Array(width * height).fill(".");
  grid.forEach((loc, idx) => {
    const pos = {
      x: idx % width,
      y: parseInt(idx / width)
    };
    points.forEach(point => {
      const dist = getDistance(point, pos);
      point.distances.push(dist);
    });
  });

  return grid;
};

const populateClosestPoints = (grid, points) => {
  return grid.map((loc, idx) => {
    const closestPoint = minBy(points, p => p.distances[idx]);
    const minDistance = closestPoint.distances[idx];
    const numMatches = countBy(points, p => p.distances[idx] === minDistance);

    if (numMatches.true === 1) {
      return closestPoint.id;
    }
    return loc;
  });
};

const getDesiredPositions = (grid, points) => {
  const positions = [];
  grid.forEach((loc, idx) => {
    const totalDistance = sumBy(points, p => p.distances[idx]);
    if (totalDistance < 10000) {
      positions.push(idx);
    }
  });
  return positions;
};

const removeInfinitePoints = (grid, width, height) => {
  grid.forEach((pointId, idx) => {
    if (pointId === ".") {
      return;
    }
    const pos = {
      x: idx % width,
      y: parseInt(idx / width)
    };

    if (
      pos.x === 0 ||
      pos.x === width - 1 ||
      pos.y === 0 ||
      pos.y === height - 1
    ) {
      grid = grid.map(oldId => (oldId === pointId ? "." : oldId));
    }
  });
  return grid;
};

export const solvePart1 = input => {
  const points = getPoints(input);
  const width = maxBy(points, p => p.x).x + 1;
  const height = maxBy(points, p => p.y).y + 1;

  let grid = buildGrid(points);
  grid = populateClosestPoints(grid, points);
  grid = removeInfinitePoints(grid, width, height);
  const counts = countBy(grid);

  let max = 0;
  Object.keys(counts).forEach(k => {
    const v = counts[k];
    if (v > max && k !== ".") {
      max = v;
    }
  });

  return max;
};

export const solvePart2 = input => {
  const points = getPoints(input);

  let grid = buildGrid(points);
  return getDesiredPositions(grid, points).length;
};

const printGrid = (grid, width) => {
  let str = "";
  grid.forEach((loc, i) => {
    if (i !== 0 && i % width === 0) {
      str += "\n";
    }
    str += loc + " ";
  });

  console.log(str);
};
