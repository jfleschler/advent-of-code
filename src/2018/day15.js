import {
  chain,
  sortBy,
  filter,
  uniqWith,
  isEqual,
  head,
  remove,
  find,
  sumBy
} from "lodash";

const directions = [
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 }
];

const buildMap = input => {
  input = input.trim().split("\n");

  const width = input[0].length;
  const height = input.length;

  let units = [];
  const walls = Array(width)
    .fill()
    .map(() => Array(height).fill("."));

  let id = 0;
  input.forEach((l, y) => {
    [...l].forEach((i, x) => {
      if (i === "#") {
        walls[x][y] = i;
      } else if (i !== ".") {
        units.push({
          id: id++,
          type: i,
          hp: 200,
          pos: { x, y }
        });
      }
    });
  });

  return { walls, units };
};

const orderUnits = (units, prefix = "pos.") => {
  return chain(units)
    .sortBy(`${prefix}x`)
    .sortBy(`${prefix}y`)
    .value();
};

export const chooseTarget = (unitPos, targets, walls, units) => {
  const possibleLocations = getPossibleMoves(unitPos, 0, walls, units);
  const toVisit = [...possibleLocations];
  const visited = [];

  let foundTargets = [];
  let chosen = null;
  while (toVisit.length) {
    const testPos = toVisit.shift();
    visited.push(testPos);

    remove(toVisit, pos => visited.includes(pos));

    const matches = targets.filter(p => posEquals(testPos, p));
    if (matches.length) {
      if (!foundTargets.some(p => posEquals(testPos, p))) {
        foundTargets.push(testPos);
      }
    }

    // if we've discovered all our possible next moves, break out early
    if (foundTargets.length === targets.length) {
      break;
    }

    const newMoves = getPossibleMoves(testPos, testPos.dist, walls, units)
      .filter(pos => !visited.some(p => posEquals(pos, p)))
      .filter(pos => !toVisit.some(p => posEquals(pos, p)));
    toVisit.push(...newMoves);
  }

  // no target found
  if (!foundTargets.length) {
    return null;
  }

  // choose the closest found target
  foundTargets = orderUnits(foundTargets, "");
  chosen = head(sortBy(foundTargets, "dist"));
  return chosen;
};

export const buildDistanceMap = (chosenPos, unit, walls, units) => {
  const unitNextMoves = getPossibleMoves(unit.pos, 0, walls, units);

  const possibleLocations = getPossibleMoves(chosenPos, 0, walls, units);
  possibleLocations.push({ ...chosenPos, dist: 0 });
  const toVisit = [...possibleLocations];
  const visited = [...possibleLocations];

  const distMap = Array(walls[0].length)
    .fill()
    .map(() => Array(walls.length).fill(Infinity));

  const foundTargets = [];
  while (toVisit.length) {
    const testPos = toVisit.shift();
    visited.push(testPos);

    const matches = unitNextMoves.filter(p => posEquals(testPos, p));
    if (matches.length) {
      if (!foundTargets.some(p => posEquals(testPos, p))) {
        foundTargets.push(testPos);
      }
    }

    if (testPos.dist < distMap[testPos.x][testPos.y]) {
      distMap[testPos.x][testPos.y] = testPos.dist;
    }

    // if we've discovered all our possible next moves, break out early
    if (foundTargets.length === unitNextMoves.length) {
      return distMap;
    }

    const newMoves = getPossibleMoves(testPos, testPos.dist, walls, units)
      .filter(pos => !visited.some(p => posEquals(pos, p)))
      .filter(pos => !toVisit.some(p => posEquals(pos, p)));
    toVisit.push(...newMoves);
  }

  return distMap;
};

const posEquals = (pos1, pos2) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

const getPossibleMoves = (fromPos, prevDist, walls, units) => {
  return directions
    .map(dir => {
      return {
        x: fromPos.x + dir.x,
        y: fromPos.y + dir.y,
        dist: prevDist + 1,
        prev: fromPos
      };
    })
    .filter(pos => walls[pos.x][pos.y] !== "#")
    .filter(
      pos =>
        !units.some(u => u.pos.x === pos.x && u.pos.y === pos.y && u.hp > 0)
    );
};

const getAttackableTarget = (unit, targets) => {
  let possibleTargets = directions
    .map(dir => {
      return {
        x: unit.pos.x + dir.x,
        y: unit.pos.y + dir.y
      };
    })
    .filter(pos =>
      targets.some(t => t.pos.x === pos.x && t.pos.y === pos.y && t.hp > 0)
    )
    .map(pos => find(targets, t => t.pos.x === pos.x && t.pos.y === pos.y));

  possibleTargets = orderUnits(possibleTargets);
  possibleTargets = sortBy(possibleTargets, "hp");
  return head(possibleTargets);
};

const moveUnit = (unit, units, targets, walls) => {
  // find in range positions
  let inRangePositions = targets
    .reduce((acc, cur) => {
      acc.push({ x: cur.pos.x, y: cur.pos.y - 1 });
      acc.push({ x: cur.pos.x - 1, y: cur.pos.y });
      acc.push({ x: cur.pos.x + 1, y: cur.pos.y });
      acc.push({ x: cur.pos.x, y: cur.pos.y + 1 });
      return uniqWith(acc, isEqual);
    }, [])
    .filter(pos => walls[pos.x][pos.y] !== "#")
    .filter(
      pos =>
        !units.some(u => u.pos.x === pos.x && u.pos.y === pos.y && u.hp > 0)
    );

  // find our chosen target
  const chosen = chooseTarget(unit.pos, inRangePositions, walls, units);

  if (!chosen) {
    return false;
  }

  // build a distance map
  const distMap = buildDistanceMap(chosen, unit, walls, units);
  let possibleMoves = getPossibleMoves(unit.pos, 0, walls, units).map(loc => {
    const dist = distMap[loc.x][loc.y];
    return {
      ...loc,
      dist
    };
  });

  // pick our next move
  possibleMoves = orderUnits(possibleMoves, "");
  possibleMoves = sortBy(possibleMoves, "dist");

  const cleanedMoves = possibleMoves.map(m => {
    let out;
    if (m.x < unit.pos.x && m.y === unit.pos.y) {
      out = "L";
    } else if (m.x > unit.pos.x && m.y === unit.pos.y) {
      out = "R";
    } else if (m.x === unit.pos.x && m.y < unit.pos.y) {
      out = "U";
    } else if (m.x === unit.pos.x && m.y > unit.pos.y) {
      out = "D";
    }
    return out + ` ${m.x},${m.y}:${m.dist}`;
  });
  console.log(`${unit.type}:${unit.id}`, cleanedMoves);
  const nextMove = head(possibleMoves);

  if (nextMove) {
    unit.pos.x = nextMove.x;
    unit.pos.y = nextMove.y;
  }
};

const attack = (unit, targets, elfPower) => {
  const attackTarget = getAttackableTarget(unit, targets);

  if (attackTarget) {
    console.log(
      `${unit.type}:${unit.id}(${unit.hp}) attacked ${attackTarget.type}:${
        attackTarget.id
      }(${attackTarget.hp})`
    );

    if (unit.type === "E") {
      attackTarget.hp -= elfPower;
    } else {
      attackTarget.hp -= 3;
    }

    if (attackTarget.hp <= 0) {
      console.log(`${attackTarget.type}:${attackTarget.id} has died.`);
    }
    return true;
  }
  return false;
};

const simulateBattle = (walls, units, elfPower) => {
  let hasTargets = true;
  let i = 0;
  // printRound(walls, units, i);

  while (hasTargets) {
    units = orderUnits(units);
    units.forEach(unit => {
      if (unit.hp <= 0) {
        return;
      }
      const targets = filter(units, u => u.type !== unit.type && u.hp > 0);

      // if there are no targets, we win!
      if (!targets.length) {
        hasTargets = false;
      }

      // attack if I can
      // otherwise, move then try to attack
      if (!attack(unit, targets, elfPower)) {
        moveUnit(unit, units, targets, walls);
        attack(unit, targets, elfPower);
      }
    });

    remove(units, u => u.hp <= 0);
    i++;
    // printRound(walls, units, i);
  }

  // printRound(walls, units, i);
  return i;
};

export const solvePart1 = input => {
  let { walls, units } = buildMap(input);

  const rounds = simulateBattle(walls, units, 3);

  console.log(sumBy(units, "hp"), rounds);
  return sumBy(units, "hp") * (rounds - 1);
};

export const solvePart2 = input => {
  let { walls, units } = buildMap(input);

  const numElves = units.filter(u => u.type === "E").length;
  let remainingElves = 0;
  let rounds = 0;
  let attackPow = 13;

  let currentUnits;
  do {
    ++attackPow;
    console.log(`Attack Power: ${attackPow}`);
    currentUnits = JSON.parse(JSON.stringify(units));

    rounds = simulateBattle(walls, currentUnits, attackPow);
    remove(currentUnits, u => u.hp <= 0);

    remainingElves = currentUnits.filter(u => u.type === "E" && u.hp > 0)
      .length;
  } while (numElves !== remainingElves);
  printRound(walls, currentUnits, rounds);

  console.log(sumBy(currentUnits, "hp"), rounds);
  return sumBy(currentUnits, "hp") * (rounds - 1);
};

const printRound = (walls, units, round) => {
  const width = walls[0].length;
  const height = walls.length;

  let out = `\n\nRound: ${round}\n`;
  for (let y = 0; y < height; y++) {
    let health = "\t";
    for (let x = 0; x < width; x++) {
      const unit = head(units.filter(u => u.pos.x === x && u.pos.y === y));
      if (walls[x][y] === Infinity) {
        out += "#";
        continue;
      }

      if (unit && unit.hp > 0) {
        out += unit.type;
        health += `  ${unit.type}:${unit.id}(${unit.hp})`;
      } else {
        out += walls[x][y];
      }
    }
    out += health + "\n";
  }
  console.log(out);
};
