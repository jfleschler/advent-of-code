import { solvePart1, solvePart2 } from './day07.js'

const exampleInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`

describe('day 7', () => {
    describe('part 1', () => {
        test('solves an example', () => {
            const answer = solvePart1(exampleInput)
            expect(answer).toEqual('tknk')
        })
    })

    describe('part 2', () => {
        test('solves an example', () => {
            const answer = solvePart2(exampleInput)
            expect(answer).toEqual(60)
        })
    })
})
