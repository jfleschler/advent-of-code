import { findCornerBase, solvePart1, solvePart2 } from './day3.js'

describe('day 3', () => {
    describe('part 1', () => {
        test('find corner base', () => {
            expect(findCornerBase(26)).toEqual(5)
            expect(findCornerBase(12)).toEqual(3)
        })

        test('solves examples', () => {
            expect(solvePart1(1)).toEqual(0)
            expect(solvePart1(12)).toEqual(3)
            expect(solvePart1(23)).toEqual(2)
            expect(solvePart1(1024)).toEqual(31)
        })
    })

    describe('part 2', () => {
        test('solves examples', () => {
            expect(solvePart2(1)).toEqual(2)
            expect(solvePart2(4)).toEqual(5)
            expect(solvePart2(11)).toEqual(23)
            expect(solvePart2(57)).toEqual(59)
            expect(solvePart2(147)).toEqual(304)
        })
    })
})
