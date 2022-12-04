import { executeInstructionsCrateMover9000, executeInstructionsCrateMover9001, prepareData } from './Day5Parser';

export const solutionPartOne = (input: string): string => {
    return executeInstructionsCrateMover9000(...prepareData(input));
};

export const solutionPartTwo = (input: string): string => {
    return executeInstructionsCrateMover9001(...prepareData(input));
};
