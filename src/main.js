import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import chalk from 'chalk'
require('dotenv').config()

const run = async (year, day, part) => {
    const dayModule = require(`./${year}/day${day}.js`)
    const filePath = path.join(process.cwd(), 'input', year, `day${day}`)

    if (!fs.existsSync(filePath)) {
        const d = day.startsWith('0') ? day.substring(1) : day
        const res = await fetch(`http://adventofcode.com/${year}/day/${d}/input`, {
            headers: {
                Cookie: `session=${process.env.SESSION}`
            },
        })
        const input = await res.text()
        fs.writeFileSync(filePath, input)
    }

    const input = fs.readFileSync(filePath, 'utf-8').trim()
    const answer = dayModule[`solvePart${part}`](input)
    return answer
}

run(process.argv[2], process.argv[3], process.argv[4])
    .then(answer => {
        console.log(`>>> ${chalk.red(answer)} <<<`)
    })
    .catch(e => console.error(e))
