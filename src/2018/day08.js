import { times, sum } from "lodash";

const walk = input => {
  const [children, metadata] = input.splice(0, 2);

  if (!children) {
    return {
      md: input.splice(0, metadata)
    };
  }

  const node = {
    children: []
  };
  times(children, () => {
    node.children.push(walk(input));
  });

  node.md = input.splice(0, metadata);
  return node;
};

const sumMetadata = node => {
  // console.log(node.md);
  if (!node.children) return sum(node.md);
  return sum(node.md) + sum(node.children.map(sumMetadata));
};

const getValueForNode = node => {
  if (!node.children) {
    return sum(node.md);
  }

  return node.md.reduce((acc, cur) => {
    const child = node.children[cur - 1];
    if (child) {
      acc += getValueForNode(child);
    }
    return acc;
  }, 0);
};

// 2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
// A----------------------------------
//     B----------- C-----------
//                      D-----
export const solvePart1 = input => {
  input = input.split(" ").map(Number);
  const tree = walk(input);
  return sumMetadata(tree);
};

export const solvePart2 = input => {
  input = input.split(" ").map(Number);
  const tree = walk(input);
  return getValueForNode(tree);
};
