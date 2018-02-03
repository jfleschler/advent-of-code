import { flatMap, difference, keyBy, isEmpty, find } from 'lodash'

const parsePrograms = input => {
    const programStrs = input.split('\n')
    const re = /([a-z]+) \((\d+)\)( -> ([a-z, ]*))?/
    return programStrs.map(str => {
        const [, name, weight, , subProgramStrs] = re.exec(str)
        const subPrograms = subProgramStrs ? subProgramStrs.split(', ') : []
        return {
            name,
            weight: Number(weight),
            fullWeight: Number(weight),
            subPrograms,
        }
    })
}

const getRoot = programs => {
    const allSubPrograms = flatMap(programs, program => program.subPrograms)
    const [root] = difference(programs.map(p => p.name), allSubPrograms)
    return root
}

export const solvePart1 = input => {
    const programs = parsePrograms(input)
    return getRoot(programs)
}

const buildGraph = (nodeName, keyedPrograms) => {
    const node = keyedPrograms[nodeName]

    if (!isEmpty(node.subPrograms)) {
        node.subPrograms = node.subPrograms.map(subProgram => ({
            ...buildGraph(subProgram, keyedPrograms),
            parent: node,
        }))
    }

    node.fullWeight = node.fullWeight + node.subPrograms.reduce((acc, n) => acc + n.fullWeight, 0)

    return node
}

const isNodeBalanced = node => {
    if (isEmpty(node.subPrograms)) return true

    const targetWeight = node.subPrograms[0]
    for (let i = 1; i < node.subPrograms.length; i++) {
        if (node.subPrograms[i].weight !== targetWeight) {
            return false
        }
    }

    return true
}

const findDeepestUnbalancedParent = node => {
    const unbalancedChild = node.subPrograms.find(sp => !isNodeBalanced(sp))
    if (!unbalancedChild) return node.parent
    return findDeepestUnbalancedParent(unbalancedChild)
}

export const solvePart2 = input => {
    const programs = parsePrograms(input)
    const root = getRoot(programs)
    const keyedPrograms = keyBy(programs, 'name')
    const graph = buildGraph(root, keyedPrograms)
    const unbalanced = findDeepestUnbalancedParent(graph)

    const weights = {}
    unbalanced.subPrograms.forEach(subProgram => {
        const { fullWeight } = subProgram
        if (!weights[fullWeight]) weights[fullWeight] = []
        weights[fullWeight].push(subProgram)
    })

    const [unbalancedNode] = find(weights, programs => programs.length === 1)
    const [balancedNode] = find(weights, programs => programs.length > 1)

    return unbalancedNode.weight - (unbalancedNode.fullWeight - balancedNode.fullWeight)
}
