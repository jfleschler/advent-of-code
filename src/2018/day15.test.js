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

    test("solves an example", () => {
      const example = [
        "#######",
        "#G..#E#",
        "#E#E.E#",
        "#G.##.#",
        "#...#E#",
        "#...E.#",
        "#######"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(36334);
    });
    test("solves an example", () => {
      const example = [
        "#######",
        "#E..EG#",
        "#.#G.E#",
        "#E.##E#",
        "#G..#.#",
        "#..E#.#",
        "#######"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(39514);
    });
    test("solves an example", () => {
      const example = [
        "#######",
        "#E.G#.#",
        "#.#G..#",
        "#G.#.G#",
        "#G..#.#",
        "#...E.#",
        "#######"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(27755);
    });
    test("solves an example", () => {
      const example = [
        "#######",
        "#.E...#",
        "#.#..G#",
        "#.###.#",
        "#E#G#G#",
        "#...#G#",
        "#######"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(28944);
    });
    test("solves an example", () => {
      const example = [
        "#########",
        "#G......#",
        "#.E.#...#",
        "#..##..G#",
        "#...##..#",
        "#...#...#",
        "#.G...G.#",
        "#.....G.#",
        "#########"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(18740);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual();
    });
  });
});
