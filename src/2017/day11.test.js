import { solvePart1, solvePart2 } from './day11.js'

describe('day 11', () => {
    describe('part 1', () => {
        test('solves examples', () => {
            expect(solvePart1('ne,ne,ne')).toEqual(3)
            expect(solvePart1('ne,ne,sw,sw')).toEqual(0)
            expect(solvePart1('ne,ne,s,s')).toEqual(2)
            expect(solvePart1('se,sw,se,sw,sw')).toEqual(3)
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2('se,sw,se,sw,sw')
            expect(answer).toEqual(3)
        })
    })
})
