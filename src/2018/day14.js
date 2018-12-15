import { pad } from "lodash";

const printRecipes = (recipes, elf1, elf2) => {
  let out = "";
  recipes.forEach((r, i) => {
    if (i === elf1) {
      out += pad(`(${r})`, 4);
    } else if (i === elf2) {
      out += pad(`[${r}]`, 4);
    } else {
      out += pad(r, 4);
    }
  });
  console.log(out);
};

const buildNextRecipes = (recipes, elves) => {
  const elf1Score = recipes[elves.elf1];
  const elf2Score = recipes[elves.elf2];
  let newRecipe = elf1Score + elf2Score;
  recipes.push(
    ...newRecipe
      .toString()
      .split("")
      .map(Number)
  );

  elves.elf1 = (elves.elf1 + (1 + elf1Score)) % recipes.length;
  elves.elf2 = (elves.elf2 + (1 + elf2Score)) % recipes.length;
};

export const solvePart1 = input => {
  const numRecipes = parseInt(input.trim());

  let recipes = [3, 7];
  let elves = { elf1: 0, elf2: 1 };
  while (recipes.length < numRecipes + 10) {
    buildNextRecipes(recipes, elves);
  }
  return recipes.splice(numRecipes, 10).join("");
};

export const solvePart2 = input => {
  const numRecipes = [...input.split("\n")[0]];
  const puzzleInput = numRecipes.join("");

  let recipes = [3, 7];
  let elves = { elf1: 0, elf2: 1 };

  while (1 === 1) {
    buildNextRecipes(recipes, elves);

    const offset = recipes.length - numRecipes.length;
    const testString = recipes.slice(offset).join("");
    if (testString == puzzleInput) {
      return offset;
    }

    const offset2 = recipes.length - numRecipes.length - 1;
    const testString2 = recipes.slice(offset2, recipes.length - 1).join("");
    if (testString2 == puzzleInput) {
      return offset2;
    }
  }
};
