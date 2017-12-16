export const solve = (input, rotate) => {
    const nums = input.split('').map(Number)

    return nums.reduce((acc, num, idx) => {
        if (num === nums[(idx + rotate) % nums.length]) acc += num
        return acc
    }, 0)
}

if (require.main === module) {
    const getStdin = require('get-stdin')
    getStdin()
        .then(input => {
            const answer = solve(input.trim(), input.trim().length / 2)
            console.log(`The answer is ${answer}`)
        })
}
