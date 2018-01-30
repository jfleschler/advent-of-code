import { maxBy } from 'lodash';

const ops = {
    '>': (n, val) => val > n,
    '>=': (n, val) => val >= n,
    '<': (n, val) => val < n,
    '<=': (n, val) => val <= n,
    '==': (n, val) => val == n,
    '!=': (n, val) => val != n,
    'inc': (a, b) => a + b,
    'dec': (a, b) => a - b,
}

const parseInput = input =>
    input.split('\n').reduce((acc, line) => {
        const [register, op, amt, , testRegister, testOp, testAmt] = line.split(' ')

        const testPassed = ops[testOp](Number(testAmt), acc.registers[testRegister] || 0)
        const val = acc.registers[register] || 0
        const newVal = testPassed ? ops[op](val, Number(amt)) : val

        return {
            registers: {
                ...acc.registers,
                [register]: newVal,
            },
            maxSeen: (acc.maxSeen === null || newVal > acc.maxSeen) ? newVal : acc.maxSeen,
        }
    }, { registers: [], maxSeen: null })

export const solvePart1 = input => {
    const state = parseInput(input)
    return maxBy(Object.values(state.registers));
}

export const solvePart2 = input => {
    const state = parseInput(input)
    return state.maxSeen
}
