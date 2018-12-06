import { solvePart1, solvePart2 } from "./day06.js";

const example = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].join("\n");

describe("2018 day 06", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(example);
      expect(answer).toEqual(17);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual(16);
    });
  });
});
