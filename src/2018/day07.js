import { difference, range } from "lodash";

class Graph {
  constructor(edges) {
    this.vertices = {};

    edges.forEach(e => {
      this.addVertex(e.from);
      this.addVertex(e.to);

      this.vertices[e.to].incoming.push(e.from);
    });
  }

  addVertex(vertex) {
    if (!this.vertices[vertex]) {
      this.vertices[vertex] = {
        incoming: []
      };
    }
  }

  walk(result = []) {
    let available = Object.keys(this.vertices)
      .filter(n => {
        const node = this.vertices[n];
        const unvisited = difference(node.incoming, result);
        return unvisited.length === 0 && !result.includes(n);
      })
      .sort();

    if (available.length === 0) {
      return result;
    }

    result.push(available[0]);
    return this.walk(result);
  }

  step(workers, result = [], time = 0) {
    // process each active worker
    workers.forEach(worker => {
      if (worker.node) {
        worker.time--;
        if (!worker.time) {
          // the worker has finished his node
          result.push(worker.node);
          worker.node = null;
        }
      }
    });

    // find all available nodes
    let available = Object.keys(this.vertices)
      .filter(n => {
        const node = this.vertices[n];
        const unvisited = difference(node.incoming, result);
        return unvisited.length === 0 && !result.includes(n);
      })
      .sort();

    // make sure we didn't reach the end
    if (available.length === 0) {
      return time;
    }

    // remove any nodes that in progress
    available = available.filter(n => {
      const inProgress = workers.map(w => w.node);
      return !inProgress.includes(n);
    });

    // assign any unassigned workers
    workers.forEach(worker => {
      if (!worker.node) {
        const nextNode = available.shift();
        if (nextNode) {
          worker.node = nextNode;
          worker.time = nextNode.toLowerCase().charCodeAt() - 96 + 60; // 0;
        }
      }
    });

    return this.step(workers, result, time + 1);
  }
}

const parseInput = input => {
  const regex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin/;
  return input.split("\n").map(l => {
    return {
      from: regex.exec(l)[1],
      to: regex.exec(l)[2]
    };
  });
};

export const solvePart1 = input => {
  const graph = new Graph(parseInput(input));
  const result = graph.walk();
  return result.join("");
};

export const solvePart2 = input => {
  const graph = new Graph(parseInput(input));

  const numWorkers = 5; // = 2;
  const workers = range(0, numWorkers).map(i => {
    return {
      node: null,
      time: 0
    };
  });

  return graph.step(workers);
};
