import { solvePart1, solvePart2 } from "./day01.js";

describe("2018 day 01", () => {
  describe("part 1", () => {
    test("solves ['+1', '+1', '+1']", () => {
      const example = ["+1", "+1", "+1"].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(3);
    });

    test("solves ['+1', '+1', '-2']", () => {
      const example = ["+1", "+1", "-2"].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(0);
    });

    test("solves ['-1', '-2', '-3']", () => {
      const example = ["-1", "-2", "-3"].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(-6);
    });
  });

  describe("part 2", () => {
    test("solves ['+1', '-1']", () => {
      const example = ["+1", "-1"].join("\n");
      const answer = solvePart2(example);
      expect(answer).toEqual(0);
    });

    test("solves ['+3', '+3', '+4', '-2', '-4']", () => {
      const example = ["+3", "+3", "+4", "-2", "-4"].join("\n");
      const answer = solvePart2(example);
      expect(answer).toEqual(10);
    });
  });
});
