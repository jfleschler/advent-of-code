# advent-of-code

These are my solutions to the [Advent of Code](http://adventofcode.com) programming puzzles.

## Setup

- `brew install watchman`
- `yarn`
- Create a `.env` file in the root of this project directory with `SESSION=<your session cookie from AoC>`.

## Workflow

First, generate a skeleton for the day you're solving:

`yarn run generate <yyyy> <dd>`

Next, work on your code and tests. Run tests in watch mode with:

`yarn run test:watch <yyyy>.day<dd>`

Once you're ready to solve your input, run:

`yarn run solve <yyyy> <dd> <part (1 or 2)>`
