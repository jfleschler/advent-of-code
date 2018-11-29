import fs from 'fs'
import path from 'path'

const run = (year, day) => {
    const solutionTemplate = path.join(process.cwd(), 'templates', 'day.js')
    const testTemplate = path.join(process.cwd(), 'templates', 'test.js')
    const solutionFile = path.join(__dirname, year, `day${day}.js`)
    const testFile = path.join(__dirname, year, `day${day}.test.js`)

    const st = fs.readFileSync(solutionTemplate, 'utf-8')
    const tt = fs.readFileSync(testTemplate, 'utf-8')
        .replace(/YYY/g, year)
        .replace(/XXX/g, day)

    if (!fs.existsSync(solutionFile)) {
        fs.writeFileSync(solutionFile, st, 'utf-8')
        console.log(`Generated ${solutionFile}`)
    }

    if (!fs.existsSync(testFile)) {
        fs.writeFileSync(testFile, tt, 'utf-8')
        console.log(`Generated ${testFile}`)
    }
}

run(process.argv[2], process.argv[3])
