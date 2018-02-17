import { solvePart1, solvePart2 } from './day10.js'

describe('day 10', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1('3,4,1,5', 5)
            expect(answer).toEqual(12)
        })
    })

    describe('part 2', () => {
        test('solves examples', () => {
            expect(solvePart2('')).toEqual('a2582a3a0e66e6e86e3812dcb672a272')
            expect(solvePart2('AoC 2017')).toEqual('33efeb34ea91902bb2f59c9920caa6cd')
            expect(solvePart2('1,2,3')).toEqual('3efbe78a8d82f29979031a4aa0b16a9d')
            expect(solvePart2('1,2,4')).toEqual('63960835bcdc130f0b66d7ff4f6a5a8e')
        })
    })
})
