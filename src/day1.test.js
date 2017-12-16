import { solvePart1, solvePart2 } from './day1.js'

describe('day 1', () => {
    describe('part 1', () => {
        test('solves example 1', () => {
            expect(solvePart1('1122')).toBe(3)
        })

        test('solves example 2', () => {
            expect(solvePart1('1111')).toBe(4)
        })

        test('solves example 3', () => {
            expect(solvePart1('1234')).toBe(0)
        })

        test('solves example 4', () => {
            expect(solvePart1('91212129')).toBe(9)
        })
    })
    
    describe('part 2', () => {
        test('solves example 1', () => {
            expect(solvePart2('1212')).toBe(6)
        })

        test('solves example 2', () => {
            expect(solvePart2('1221')).toBe(0)
        })

        test('solves example 3', () => {
            expect(solvePart2('123425')).toBe(4)
        })

        test('solves example 4', () => {
            expect(solvePart2('123123')).toBe(12)
        })

        test('solves example 5', () => {
            expect(solvePart2('12131415')).toBe(4)
        })
    })
})
