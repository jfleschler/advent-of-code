import { solvePart1, solvePart2 } from "./day11.js";

describe("2018 day 11", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(18);
      expect(answer).toEqual("33,45");
    });
    test("solves an example", () => {
      const answer = solvePart1(42);
      expect(answer).toEqual("21,61");
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(18);
      expect(answer).toEqual("90,269,16");
    });
  });
});
