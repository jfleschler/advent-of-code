import { solvePart1, solvePart2 } from './day09.js'

describe('day 9', () => {
    describe('part 1', () => {
        test('solves various examples', () => {
            expect(solvePart1('{}')).toEqual(1)
            expect(solvePart1('{{{}}}')).toEqual(6)
            expect(solvePart1('{{},{}}')).toEqual(5)
            expect(solvePart1('{{{},{},{{}}}}')).toEqual(16)
            expect(solvePart1('{<a>,<a>,<a>,<a>}')).toEqual(1)
            expect(solvePart1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual(9)
            expect(solvePart1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toEqual(9)
            expect(solvePart1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toEqual(3)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            expect(solvePart2('<>')).toEqual(0)
            expect(solvePart2('<random characters>')).toEqual(17)
            expect(solvePart2('<<<<>')).toEqual(3)
            expect(solvePart2('<{!>}>')).toEqual(2)
            expect(solvePart2('<!!>')).toEqual(0)
            expect(solvePart2('<!!!>>')).toEqual(0)
            expect(solvePart2('<{o"i!a,<{i<a>')).toEqual(10)
        })
    })
})
