# aoc-2017

These are my solutions to the [Advent of Code 2017](http://adventofcode.com/2017) programming puzzles.

## Setup

- `brew install watchman`
- `yarn`

## Running tests

`yarn test:watch <day>`. For example, `yarn test:watch day1`

## Executing against the real input

Create a `.env` file in the root of this project directory with `SESSION=<your session cookie from AoC>`. This will
enable the app to fetch the input for a given day and store it if it doesn't exist.

Run `babel-node src/main.js <day> <part>` to execute a problem.

For example, to run the second part of the day one problem, `babel-node src/main.js 1 2`
