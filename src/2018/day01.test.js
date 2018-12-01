import { solvePart1, solvePart2 } from './day01.js'

describe('2018 day 01', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const example = ['+1', '-3', '+6'].join('\n')
            const answer = solvePart1(example)
            expect(answer).toEqual(4)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const example = ['+3', '+3', '+4', '-2', '-4'].join('\n')
            const answer = solvePart2(example)
            expect(answer).toEqual(10)
        })
    })
})
