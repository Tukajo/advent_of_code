// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const testInput = readFile(fullFilePath);

// Test the day1 function
import { solutionPartOne, solutionPartTwo } from './Day5';
import { prepareData } from './Day5Parser';

test('Day 5 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe('SBPQRSCDF');
});

test('Day 5 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe('RGLVRCQSB');
});

test('Data parsing', () => {
    const [instructions, stacks] = prepareData(testInput);
    expect(instructions[0]).toEqual({ quantity: 1, sourceIndex: 8, targetIndex: 4 });
    expect(stacks[0]).toEqual(['J', 'H', 'P', 'M', 'S', 'F', 'N', 'V']);
});
