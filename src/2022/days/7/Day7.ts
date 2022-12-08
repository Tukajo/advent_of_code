import { FileSystem, FileSystemNodeType, generateFileSystem } from './Day7Parser';

export const solutionPartOne = (input: string): number => {
    const fileSystem: FileSystem = generateFileSystem(input);
    // predicate for directories with size over 100000.
    const sizePredicate = (node: FileSystemNodeType) => node.type === 'dir' && node.getSize() <= 100000;
    const directoriesExceedingThreshold = fileSystem.root.getDescendantsByPredicate(sizePredicate);

    return directoriesExceedingThreshold.reduce((acc, curr) => acc + curr.getSize(), 0);
};

export const solutionPartTwo = (input: string): number => {
    const fileSystem: FileSystem = generateFileSystem(input);
    fileSystem.printFileSystem();
    // predicate for directories with size over 100000.

    const USED_SPACE = fileSystem.root.getSize();
    const REQUIRED_SPACE = 30000000;
    const TOTAL_SPACE = 70000000;
    const FREE_SPACE = TOTAL_SPACE - USED_SPACE;
    const NEEDED_SPACE = REQUIRED_SPACE - FREE_SPACE;
    const sizePredicate = (node: FileSystemNodeType) => node.type === 'dir' && node.getSize() >= NEEDED_SPACE;

    const directoriesExceedingThreshold = fileSystem.root.getDescendantsByPredicate(sizePredicate);
    const sorted = directoriesExceedingThreshold.map((node) => node.getSize()).sort((a, b) => a - b);
    return sorted[0];
};
