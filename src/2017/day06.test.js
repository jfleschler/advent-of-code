import { solvePart1, solvePart2 } from './day06.js'

describe('day 6', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(`0\t2\t7\t0`)
            expect(answer).toEqual(5)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2(`0\t2\t7\t0`)
            expect(answer).toEqual(4)
        })
    })
})
