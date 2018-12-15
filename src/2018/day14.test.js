import { solvePart1, solvePart2 } from "./day14.js";

describe("2018 day 14", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1("9");
      expect(answer).toEqual("5158916779");
    });
    test("solves an example", () => {
      const answer = solvePart1("5");
      expect(answer).toEqual("0124515891");
    });
    test("solves an example", () => {
      const answer = solvePart1("18");
      expect(answer).toEqual("9251071085");
    });
    test("solves an example", () => {
      const answer = solvePart1("2018");
      expect(answer).toEqual("5941429882");
    });
  });

  describe("part 2", () => {
    test("solves an example", () => {
      const answer = solvePart2("51589");
      expect(answer).toEqual(9);
    });
    test("solves an example", () => {
      const answer = solvePart2("01245");
      expect(answer).toEqual(5);
    });
    test("solves an example", () => {
      const answer = solvePart2("92510");
      expect(answer).toEqual(18);
    });
    test("solves an example", () => {
      const answer = solvePart2("59414");
      expect(answer).toEqual(2018);
    });
    test("solves an example", () => {
      const answer = solvePart2("509671");
      expect(answer).toEqual(2018);
    });
  });
});
