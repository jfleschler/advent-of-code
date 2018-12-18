import { solvePart1, solvePart2 } from "./day15.js";

const example = ``;

describe("2018 day 15", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const example = [
        "#######",
        "#.G...#",
        "#...EG#",
        "#.#.#G#",
        "#..G#E#",
        "#.....#",
        "#######"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(27730);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual();
    });
  });
});
