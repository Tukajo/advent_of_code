import { createMatrix, findMostScenicTree, walkForest } from './Day8Parser';

export const solutionPartOne = (input: string): number => {
    const forestMatrix = createMatrix(input);
    return walkForest(forestMatrix);
};

export const solutionPartTwo = (input: string): number => {
    const forestMatrix = createMatrix(input);
    return findMostScenicTree(forestMatrix);
};
