import { solvePart1, solvePart2 } from "./day08.js";

const example = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;

describe("2018 day 08", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(example);
      expect(answer).toEqual(138);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual(66);
    });
  });
});
