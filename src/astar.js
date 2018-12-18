import { chain, filter, uniqWith, isEqual } from "lodash";

export const astar = (walls, units, start, end) => {
  // create a node for the start and end
  const startNode = createNode(start);
  const endNode = createNode(end);

  const openList = [startNode];
  const closedList = [];

  let temp = 0;
  // loop until you find the end
  while (openList.length > 0 && ++temp < 2) {
    let currentNode = openList[0];
    let currentIndex = 0;

    // get the current node
    openList.forEach((node, index) => {
      if (node.f < currentNode.f) {
        currentNode = node;
        currentIndex = index;
      }
    });

    // pop current off open list, add to closed list
    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    // check if we reached the end
    if (currentNode.pos == endNode.pos) {
      const path = [];
      let current = currentNode;
      while (current) {
        path.push(current.pos);
        current = current.parent;
      }
      return path.reverse();
    }

    // build the children
    const children = directions
      .map(dir => {
        return {
          x: currentNode.pos.x + dir.x,
          y: currentNode.pos.y + dir.y
        };
      })
      .filter(pos => walls[pos.x][pos.y] !== "#")
      .filter(pos => !units.some(u => u.pos.x === pos.x && u.pos.y === pos.y))
      .map(pos => createNode(pos, currentNode));

    children.forEach(child => {
      if (closedList.some(node => node.pos === child.pos).length) {
        return;
      }

      // Create the f, g, and h values
      child.g = currentNode.g + 1;
      child.h =
        Math.pow(child.pos.x - endNode.pos.x, 2) +
        Math.pow(child.pos.y - endNode.pos.y, 2);
      child.f = child.g + child.h;
      if (
        openList.some(node => node.pos === child.pos && child.g > node.g).length
      ) {
        return;
      }

      // Add the child to the open list
      openList.push(child);
    });
  }
};

const createNode = (pos = null, parent = null) => {
  return {
    parent,
    pos,
    g: 0,
    h: 0,
    f: 0
  };
};
