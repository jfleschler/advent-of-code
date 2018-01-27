const serialize = banks => banks.join('|')

export const solvePart1 = input => {
    const banks = input.split('\t').map(Number)
    const seen = new Set()
    let iterations = 0

    while (!seen.has(serialize(banks))) {
        seen.add(serialize(banks))

        let highest = null, highestIdx = null

        for (let i = banks.length - 1; i >= 0; i--) {
            if (highest === null || banks[i] >= highest) {
                highest = banks[i]
                highestIdx = i
            }
        }

        banks[highestIdx] = 0

        while (highest > 0) {
            highestIdx = (highestIdx + 1) % banks.length
            banks[highestIdx] += 1
            highest--
        }

        iterations++
    }

    return iterations
}

export const solvePart2 = input => {
    const banks = input.split('\t').map(Number)
    const seen = []
    let iterations = 0

    while (seen.indexOf(serialize(banks)) === -1) {
        seen[iterations] = serialize(banks)

        let highest = null, highestIdx = null

        for (let i = banks.length - 1; i >= 0; i--) {
            if (highest === null || banks[i] >= highest) {
                highest = banks[i]
                highestIdx = i
            }
        }

        banks[highestIdx] = 0

        while (highest > 0) {
            highestIdx = (highestIdx + 1) % banks.length
            banks[highestIdx] += 1
            highest--
        }

        iterations++
    }

    return iterations - seen.indexOf(serialize(banks))
}
