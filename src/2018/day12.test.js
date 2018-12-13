import { solvePart1, solvePart2 } from "./day12.js";

const example = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

describe("2018 day 12", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1(example);
      expect(answer).toEqual(325);
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2(example);
      expect(answer).toEqual();
    });
  });
});
