export const parseInput = inputStr =>
    inputStr
        .trim()
        .split('\n')
        .map(str => str.trim())
        .map(row => row.split(/\s/g).map(Number))

export const getRowDivisibleNums = row => {
    for (let i = 0; i < row.length - 1; i++) {
        for (let j = i + 1; j < row.length; j++) {
            if (row[i] % row[j] === 0) return { base: row[j], mult: row[i] }
            if (row[j] % row[i] === 0) return { base: row[i], mult: row[j] }
        }
    }

    throw Error('Divisible numbers not found in row')
}

export const getRowMinMax = row => 
    row.reduce(({ min, max }, val) => ({
        min: min ? Math.min(min, val) : val,
        max: max ? Math.max(max, val) : val,
    }), {})

export const getRowMinMaxChecksum = row => {
    const { min, max } = getRowMinMax(row)
    return max - min
}

export const getRowDivisibleChecksum = row => {
    const { base, mult } = getRowDivisibleNums(row)
    return mult / base
}

export const solvePart1 = input => 
    parseInput(input).reduce((acc, row) => acc + getRowMinMaxChecksum(row), 0)

export const solvePart2 = input => 
    parseInput(input).reduce((acc, row) => acc + getRowDivisibleChecksum(row), 0)
