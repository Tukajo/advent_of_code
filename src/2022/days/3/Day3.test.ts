// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day3 function
import { solutionPartOne, solutionPartTwo } from './Day3';

test('Day 3 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(8394);
});

test('Day 3 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe(2413);
});
