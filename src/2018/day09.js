import { maxBy, range } from "lodash";

const removeNode = (game, node) => {
  const prev = game[node].prev;
  const next = game[node].next;
  game[prev].next = next;
  game[next].prev = prev;
};

const solve2 = (players, lastMarble) => {
  let cur = 0;
  let nextMarble = 1;
  const game = {
    0: {
      id: 0,
      prev: 0,
      next: 0
    }
  };
  const scores = Array(parseInt(players)).fill(0);

  for (let i = 0; i < players; i++) {
    const marble = game[cur];

    if (nextMarble % 23 === 0) {
      let toRemove = cur;
      range(0, 7).forEach(i => {
        const node = game[toRemove];
        toRemove = node.prev;
      });
      removeNode(game, toRemove);

      cur = game[toRemove].next;
      delete game[toRemove];

      const points = nextMarble + toRemove;
      scores[i] += points;
    } else {
      const before = game[marble.next];
      const after = game[before.next];

      game[nextMarble] = {
        id: nextMarble,
        prev: before.id,
        next: after.id
      };
      before.next = nextMarble;
      after.prev = nextMarble;

      if (nextMarble <= 4 || game[marble.next].next === nextMarble) {
        cur = nextMarble;
      }
    }

    nextMarble++;
    if (i === players - 1) {
      i = -1;
    }

    if (nextMarble > lastMarble) {
      break;
    }
  }
  return scores;
};

export const solvePart1 = input => {
  const regex = /([0-9]*) players; last marble is worth ([0-9]*) points/;
  const [, players, lastMarble] = regex.exec(input).map(Number);
  const scores = solve2(players, lastMarble);
  return maxBy(scores, s => s);
};

export const solvePart2 = input => {
  const regex = /([0-9]*) players; last marble is worth ([0-9]*) points/;
  const [, players, lastMarble] = regex.exec(input).map(Number);
  const scores = solve2(players, lastMarble * 100);
  return maxBy(scores, s => s);
};
