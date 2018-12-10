import { solvePart1, solvePart2 } from "./day09.js";

describe("2018 day 09", () => {
  describe("part 1", () => {
    test("solves an example", () => {
      const answer = solvePart1("9 players; last marble is worth 32 points");
      expect(answer).toEqual(32);
    });
    test("solves an example", () => {
      const answer = solvePart1("10 players; last marble is worth 1618 points");
      expect(answer).toEqual(8317);
    });
    test("solves an example", () => {
      const answer = solvePart1("13 players; last marble is worth 7999 points");
      expect(answer).toEqual(146373);
    });
    test("solves an example", () => {
      const answer = solvePart1("17 players; last marble is worth 1104 points");
      expect(answer).toEqual(2764);
    });
    test("solves an example", () => {
      const answer = solvePart1("21 players; last marble is worth 6111 points");
      expect(answer).toEqual(54718);
    });
    test("solves an example", () => {
      const answer = solvePart1("30 players; last marble is worth 5807 points");
      expect(answer).toEqual(37305);
    });
  });

  // describe("part 2", () => {
  //   test("solves an example", () => {
  //     const answer = solvePart2(example);
  //     expect(answer).toEqual();
  //   });
  // });
});
