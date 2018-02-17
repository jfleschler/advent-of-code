const reverseWithWrap = (list, curPos, length) => {
    for (let i = 0; i < Math.floor(length / 2); i++) {
        const leftIdx = (curPos + i) % list.length
        const rightIdx = (curPos + length - i - 1) % list.length

        const left = list[leftIdx]
        list[leftIdx] = list[rightIdx]
        list[rightIdx] = left
    }
}

const runIteration = (list, lengths, curPos, skipSize) => {
    lengths.forEach(length => {
        reverseWithWrap(list, curPos, length)
        curPos += (length + skipSize) % list.length
        skipSize++
    })

    return [curPos, skipSize]
}

export const solvePart1 = (input, size = 256, curPos = 0, skipSize = 0) => {
    const list = Array(size).fill(0).map((e, i) => i)

    input = input.split(',').map(Number);
    [curPos, skipSize] = runIteration(list, input, curPos, skipSize)

    return list[0] * list[1]
}

export const knotHash = list => {
    return list.reduce((acc, num) => {
        const hexNum = num.toString(16)
        return `${acc}${hexNum.length === 1 ? '0' : ''}${hexNum}`
    }, '')
}

export const solvePart2 = (input, size = 256, curPos = 0, skipSize = 0) => {
    const list = Array(size).fill(0).map((e, i) => i)

    input = [
        ...input.split('').map(char => char.charCodeAt()),
        17, 31, 73, 47, 23,
    ]

    for (let i = 0; i < 64; i++) {
        [curPos, skipSize] = runIteration(list, input, curPos, skipSize)
    }

    const denseList = list.reduce((acc, num, idx) => {
        const denseIdx = Math.floor(idx / 16)
        acc[denseIdx] = acc[denseIdx] ^ num
        return acc
    }, Array(16).fill(0))

    return knotHash(denseList)
}
