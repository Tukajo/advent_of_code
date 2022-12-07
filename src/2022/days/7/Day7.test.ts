// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day1 function
import { solutionPartOne, solutionPartTwo } from './Day7';

test('Day 7 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(1566);
});

test('Day 7 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe(2265);
});
