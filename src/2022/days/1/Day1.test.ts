// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day1 function
import { solution } from './Day1';

test('Day 1', () => {
    expect(solution(testInput)).toBe(59202);
});
