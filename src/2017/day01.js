export const solve = (input, rotate) => {
    const nums = input.split('').map(Number)

    return nums.reduce((acc, num, idx) => {
        if (num === nums[(idx + rotate) % nums.length]) acc += num
        return acc
    }, 0)
}

export const solvePart1 = input => solve(input, 1)
export const solvePart2 = input => solve(input, input.length / 2)
