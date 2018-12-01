const sum = arr => arr.reduce((acc, num) => acc + num, 0)

export const solvePart1 = input => {
    return sum(input.split('\n').map(Number))
}

export const solvePart2 = input => {
    const numbers = input.split('\n').map(Number)
    const seenMap = new Map()
    let i = 0
    let s = 0

    while (true) { // eslint-disable-line
        s += numbers[i]

        if (seenMap.has(s)) return s

        seenMap.set(s, true)
        i = (i + 1) % numbers.length
    }
}
