export const isValid = phrase => {
    const words = phrase.split(/\s+/)

    for (let i = 0; i < words.length - 1; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (words[i] === words[j]) return false
        }
    }

    return true
}

export const solvePart1 = input =>
    input.split('\n').map(isValid).filter(n => n).length

export const permute = word => {
    if (!word.length) return ['']

    const letters = word.split('')
    return letters.reduce((acc, letter, idx) => {
        const left = word.slice(0, idx)
        const right = word.slice(idx + 1)

        const perms = permute(`${left}${right}`)
        perms.forEach(perm => {
            acc.push(`${letter}${perm}`)
        })

        return acc
    }, [])
}

export const isAnagram = (a, b) => 
    permute(b).includes(a)

export const hasNoAnagrams = phrase => {
    const words = phrase.split(/\s+/)

    for (let i = 0; i < words.length - 1; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (isAnagram(words[i], words[j])) return false
        }
    }

    return true
}

export const solvePart2 = input =>
    input.split('\n').map(hasNoAnagrams).filter(n => n).length
