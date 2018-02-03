import { solvePart1, solvePart2 } from './day5.js'

describe('day 5', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(['0', '3', '0', '1', '-3'].join('\n'))
            expect(answer).toEqual(5)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2(['0', '3', '0', '1', '-3'].join('\n'))
            expect(answer).toEqual(10)
        })
    })
})
