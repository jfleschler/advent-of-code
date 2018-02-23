import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
require('dotenv').config()

const run = async day => {
    const dayModule = require(`./day${day}.js`)

    const filePath = path.join(process.cwd(), 'input', `day${day}`)

    if (!fs.existsSync(filePath)) {
        const d = day.startsWith('0') ? day.substring(1) : day
        const res = await fetch(`http://adventofcode.com/2017/day/${d}/input`, {
            headers: {
                Cookie: `session=${process.env.SESSION}`
            },
        })
        const input = await res.text()
        fs.writeFileSync(filePath, input)
    }

    const input = fs.readFileSync(filePath, 'utf-8').trim()
    const answer = dayModule[`solvePart${process.argv[3]}`](input)
    return answer
}

run(process.argv[2])
    .then(answer => console.log(`The answer is ${answer}`))
    .catch(e => console.error(e))
