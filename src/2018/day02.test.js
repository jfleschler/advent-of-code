import { solvePart1, solvePart2 } from "./day02.js";

describe("2018 day 02", () => {
  describe("part 1", () => {
    test("part 1", () => {
      const example = [
        "abcdef",
        "bababc",
        "abbcde",
        "abcccd",
        "aabcdd",
        "abcdee",
        "ababab"
      ].join("\n");
      const answer = solvePart1(example);
      expect(answer).toEqual(12);
    });
  });

  describe("part 2", () => {
    test("part 2", () => {
      const example = [
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
        "fguij",
        "axcye",
        "wvxyz"
      ].join("\n");
      const answer = solvePart2(example);
      expect(answer).toEqual("fgij");
    });
  });
});
