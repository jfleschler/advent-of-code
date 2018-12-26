import { solvePart1, solvePart2 } from "./day17.js";

const example = [
  "x=495, y=2..7",
  "y=7, x=495..501",
  "x=501, y=3..7",
  "x=498, y=2..4",
  "x=506, y=1..2",
  "x=498, y=10..13",
  "x=504, y=10..13",
  "y=13, x=498..504"
].join("\n");

describe("2018 day 17", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(example);
      expect(answer).toEqual(57);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual();
    });
  });
});
