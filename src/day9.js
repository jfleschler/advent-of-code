const withoutNegated = input => input.replace(/!./g, '')
const withoutGarbage = input => input.replace(/<.*?>/g, '')
const clean = input => withoutGarbage(withoutNegated(input))

export const solvePart1 = input => {
    let total = 0
    let score = 0

    for (let char of clean(input)) {
        if (char === '{') {
            score++
        }

        if (char === '}') {
            total += score
            score--
        }
    }

    return total
}

export const solvePart2 = input => {
    const lengths = withoutNegated(input).match(/<.*?>/g).map(g => g.length - 2)
    return lengths.reduce((acc, gl) => acc + gl, 0)
}
