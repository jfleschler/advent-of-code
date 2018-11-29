import { isValid, solvePart1, permute, isAnagram, hasNoAnagrams } from './day04.js'

describe('day 4', () => {
    describe('part 1', () => {
        test('validates individual phrases', () => {
            expect(isValid('aa bb cc dd ee')).toBe(true)
            expect(isValid('aa bb cc dd aa')).toBe(false)
            expect(isValid('aa bb cc dd aaa')).toBe(true)
        })

        test('solves an example', () => {
            expect(solvePart1([
                'aa bb cc dd ee',
                'aa bb cc dd aa',
                'aa bb cc dd ee',
                'aa bb cc dd eee',
            ].join('\n'))).toBe(3)
        })
    })

    describe('part 2', () => {
        test('permutes words', () => {
            expect(permute('')).toEqual([''])
            expect(permute('ab')).toEqual(['ab', 'ba'])
            expect(permute('abc')).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
        })

        test('detects anagrams', () => {
            expect(isAnagram('abcde', 'fghij')).toBe(false)
            expect(isAnagram('abcde', 'abc')).toBe(false)
            expect(isAnagram('ab', 'abc')).toBe(false)
            expect(isAnagram('ab', 'ba')).toBe(true)
            expect(isAnagram('oiii', 'ioii')).toBe(true)
        })

        test('validates individual phrases', () => {
            expect(hasNoAnagrams('abcde fghij')).toBe(true)
            expect(hasNoAnagrams('abcde xyz ecdab')).toBe(false)
            expect(hasNoAnagrams('a ab abc abd abf abj')).toBe(true)
            expect(hasNoAnagrams('iiii oiii ooii oooi oooo')).toBe(true)
            expect(hasNoAnagrams('oiii ioii iioi iiio')).toBe(false)
        })
    })
})
