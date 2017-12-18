export const solvePart1 = input => {
    const arr = input.split('\n').map(n => Number(n.trim()))

    let steps = 0
    let idx = 0

    while (idx < arr.length) {
        steps++
        arr[idx]++
        idx += (arr[idx] - 1)
    }

    return steps
}

export const solvePart2 = input => {
    const arr = input.split('\n').map(n => Number(n.trim()))

    let steps = 0
    let idx = 0

    while (idx < arr.length) {
        let delta = arr[idx] >= 3 ? -1 : 1

        steps++
        arr[idx] += delta
        idx += (arr[idx] - delta)
    }

    return steps
}
