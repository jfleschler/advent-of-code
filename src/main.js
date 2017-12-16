import fs from 'fs'
import path from 'path'

const day = process.argv[2]
const dayModule = require(`./day${day}.js`)
const input = fs.readFileSync(path.join(process.cwd(), 'input', `day${day}`), 'utf-8').trim()

const answer = dayModule[`solvePart${process.argv[3]}`](input, ...process.argv.slice(3))
console.log(`The answer is ${answer}`)
