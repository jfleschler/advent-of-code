import { solve } from './day1.js'

describe('day 1', () => {
    describe('part 1', () => {
        test('solves example 1', () => {
            expect(solve('1122', 1)).toBe(3)
        })

        test('solves example 2', () => {
            expect(solve('1111', 1)).toBe(4)
        })

        test('solves example 3', () => {
            expect(solve('1234', 1)).toBe(0)
        })

        test('solves example 4', () => {
            expect(solve('91212129', 1)).toBe(9)
        })
    })
    
    describe('part 2', () => {
        test('solves example 1', () => {
            expect(solve('1212', 2)).toBe(6)
        })

        test('solves example 2', () => {
            expect(solve('1221', 2)).toBe(0)
        })

        test('solves example 3', () => {
            expect(solve('123425', 3)).toBe(4)
        })

        test('solves example 4', () => {
            expect(solve('123123', 3)).toBe(12)
        })

        test('solves example 5', () => {
            expect(solve('12131415', 4)).toBe(4)
        })
    })
})
