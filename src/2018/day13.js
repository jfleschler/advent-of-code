import { chain } from "lodash";

const buildWorld = input => {
  input = input.replace(/\\/g, "\\");
  input = input.split("\n");

  const width = input[0].length;
  const height = input.length;

  let carts = [];
  const tracks = Array(width)
    .fill()
    .map(() => Array(height));

  let cartId = 0;
  input.forEach((l, y) => {
    [...l].forEach((i, x) => {
      if (["^", "v", "<", ">"].includes(i)) {
        carts.push({
          id: ++cartId,
          dir: i,
          x,
          y,
          lastTurn: "R"
        });

        switch (i) {
          case "^":
          case "v":
            tracks[x][y] = "|";
            break;
          case "<":
          case ">":
            tracks[x][y] = "-";
            break;
        }
      } else {
        tracks[x][y] = i;
      }
    });
  });

  carts = chain(carts)
    .sortBy("x")
    .sortBy("y")
    .value();

  return { tracks, carts };
};

const getNewPosition = cart => {
  let { x, y } = cart;

  // move in the direction
  switch (cart.dir) {
    case "^":
      y -= 1;
      break;
    case "v":
      y += 1;
      break;
    case "<":
      x -= 1;
      break;
    case ">":
      x += 1;
      break;
  }
  return { x, y };
};

const turnRight = cart => {
  cart.lastTurn = "R";
  switch (cart.dir) {
    case "^":
      cart.dir = ">";
      break;
    case ">":
      cart.dir = "v";
      break;
    case "v":
      cart.dir = "<";
      break;
    case "<":
      cart.dir = "^";
      break;
  }
};
const turnLeft = cart => {
  cart.lastTurn = "L";
  switch (cart.dir) {
    case "^":
      cart.dir = "<";
      break;
    case ">":
      cart.dir = "^";
      break;
    case "v":
      cart.dir = ">";
      break;
    case "<":
      cart.dir = "v";
      break;
  }
};

const tick = (tracks, carts, stopAfterFirstCrash = true) => {
  let crash = null;

  const cartsToRemove = [];
  carts.forEach(cart => {
    const { x, y } = getNewPosition(cart);
    cart.x = x;
    cart.y = y;

    // todo - check for collisions
    const didCrash = carts.filter(
      c => c.x === x && c.y === y && c.id !== cart.id
    );
    if (!(crash && stopAfterFirstCrash) && didCrash.length) {
      crash = `${x},${y}`;
      cartsToRemove.push(cart.id);
      cartsToRemove.push(didCrash[0].id);
    }

    // turn if necessary
    switch (tracks[x][y]) {
      case "/":
        if (cart.dir === "^") {
          cart.dir = ">";
        } else if (cart.dir === "v") {
          cart.dir = "<";
        } else if (cart.dir === "<") {
          cart.dir = "v";
        } else if (cart.dir === ">") {
          cart.dir = "^";
        }
        break;
      case "\\":
        if (cart.dir === "^") {
          cart.dir = "<";
        } else if (cart.dir === "v") {
          cart.dir = ">";
        } else if (cart.dir === "<") {
          cart.dir = "^";
        } else if (cart.dir === ">") {
          cart.dir = "v";
        }
        break;
      case "+":
        if (cart.lastTurn === "L") {
          cart.lastTurn = "S";
        } else if (cart.lastTurn === "S") {
          turnRight(cart);
        } else if (cart.lastTurn === "R") {
          turnLeft(cart);
        }
    }
  });

  carts = carts.filter(cart => !cartsToRemove.includes(cart.id));
  carts = chain(carts)
    .sortBy("x")
    .sortBy("y")
    .value();

  return { crash, carts };
};

export const solvePart1 = input => {
  let { tracks, carts } = buildWorld(input);
  let crash = null;
  while (!crash) {
    const result = tick(tracks, carts);
    crash = result.crash;
  }
  return crash;
};

export const solvePart2 = input => {
  let { tracks, carts } = buildWorld(input);
  let tickNum = 0;

  while (carts.length !== 1) {
    tickNum++;

    const result = tick(tracks, carts, false);
    carts = result.carts;
  }
  console.log(tickNum, carts);

  return `${carts[0].x},${carts[0].y}`;
};
