const axialOffsets = {
    'nw': [-1, 0],
    'n': [0, -1],
    'ne': [1, -1],
    'se': [1, 0],
    's': [0, 1],
    'sw': [-1, 1],
}

const distance = ({ col, row }) =>
    (Math.abs(col) + Math.abs(col + row) + Math.abs(row)) / 2

export const solvePart1 = input => {
    const finalPos = input.split(',').reduce((acc, dir) => {
        const [c, r] = axialOffsets[dir]
        return {
            col: acc.col + c,
            row: acc.row + r,
        }
    }, { col: 0, row: 0 })

    return distance(finalPos)
}

export const solvePart2 = input => {
    const { maxDistance } = input.split(',').reduce((acc, dir) => {
        const [c, r] = axialOffsets[dir]

        const currentPos = {
            col: acc.col + c,
            row: acc.row + r,
        }

        return {
            ...currentPos,
            maxDistance: Math.max(acc.maxDistance, distance(currentPos))
        }
    }, { col: 0, row: 0, maxDistance: 0 })

    return maxDistance
}
