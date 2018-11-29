import { parseInput, solvePart1, solvePart2 } from './day02.js'

describe('day 2', () => {
    test('parses input into array', () => {
        const parsed = parseInput(`
            5 1 9 5
            7 5 3
            2 4 6 8
        `)

        expect(parsed).toEqual([[5, 1, 9, 5], [7, 5, 3], [2, 4, 6, 8]])
    })

    describe('part 1', () => {
        test('gets the checksum', () => {
            const answer = solvePart1(`
                5 1 9 5
                7 5 3
                2 4 6 8
            `)

            expect(answer).toEqual(18)
        })
    })

    describe('part 2', () => {
        test('gets the checksum', () => {
            const answer = solvePart2(`
                5 9 2 8
                9 4 7 3
                3 8 6 5
            `)

            expect(answer).toEqual(9)
        })
    })
})
