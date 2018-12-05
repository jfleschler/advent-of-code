import { solvePart1, solvePart2 } from "./day05.js";

const example = "dabAcCaCBAcCcaDA";

describe("2018 day 05", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(example);
      expect(answer).toEqual(10);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual(4);
    });
  });
});
