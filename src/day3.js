export const findCornerBase = input => {
    const closest = Math.floor(Math.sqrt(input))
    return closest % 2 === 0 ? closest - 1 : closest
}

export const solvePart1 = target => {
    target = Number(target)
    const cornerBase = findCornerBase(target)
    const corner  = cornerBase ** 2
    const cornerDelta = Math.floor(cornerBase / 2)

    // Exact match on lower right corner
    if (target === corner) return cornerDelta * 2

    for (let i = 0; i < 4; i++) {
        const edgeMin = corner + (cornerBase * i) + 1 + i
        const edgeMax = edgeMin + cornerBase

        if (target > edgeMin && target < edgeMax) {
            const midpoint = Math.floor((edgeMin + edgeMax) / 2)
            return (cornerDelta + 1) + Math.abs(target - midpoint)
        }
    }
}

const getNeighborSum = (spiral, x, y) => {
    let sum = 0

    for (let nx = x - 1; nx <= x + 1; nx++) {
        for (let ny = y - 1; ny <= y + 1; ny++) {
            const key = `${nx},${ny}`
            sum += spiral[key] || 0
        }
    }

    return sum
}

export const solvePart2 = target => {
    target = Number(target)

    let x = 1
    let y = 0
    let dx = 0
    let dy = 1
    const spiral = {
        '0,0': 1
    }

    while (true) { // eslint-disable-line
        const sum = getNeighborSum(spiral, x, y)
        if (sum > target) return sum

        spiral[`${x},${y}`] = sum

        x += dx
        y += dy

        if (x === y && x > 0) { // Reached top right
            dx = -1
            dy = 0
        }

        if (x === -y && x < 0) { // Reached top left
            dx = 0
            dy = -1
        }

        if (x === y && x < 0) { // Reached bottom left
            dx = 1
            dy = 0
        }

        if (x - 1 === -y && x > 0) { // Reached bottom right (new spiral)
            dx = 0
            dy = 1
        }
    }
}
