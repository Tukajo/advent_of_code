// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day1 function
import { solutionPartOne, solutionPartTwo } from './Day1';

test('Day 1 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(69836);
});

test('Day 1 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe(207968);
});
