// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const sampleFilePath = __dirname + '/sample_input.txt';
const testInput = readFile(fullFilePath);
const sampleInput = readFile(sampleFilePath);

// Test the day3 function
import { solutionPartOne, solutionPartTwo } from './Day9';

test('Day 9 Part 1, works for sample', () => {
    expect(solutionPartOne(sampleInput)).toBe(13);
});

test('Day 9 Part 1, works for sample, with slight alterations', () => {
    const input = 'R 4\n' + 'U 4\n' + 'L 3\n' + 'D 1\n' + 'R 4\n' + 'D 1\n' + 'L 7\n' + 'R 2';
    expect(solutionPartOne(input)).toBe(15);
});

test('Day 9 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(6642);
});

test('Day 9 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe(2765);
});
