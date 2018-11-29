import { solvePart1, solvePart2 } from './day08.js'

const example = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`

describe('day 8', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(example)
            expect(answer).toEqual(1)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2(example)
            expect(answer).toEqual(10)
        })
    })
})
