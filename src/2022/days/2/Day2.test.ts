// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day2 function
import { solutionPartOne } from './Day2';

test('Day 2 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(14827);
});
