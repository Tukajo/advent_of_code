// read the input from test_input.txt
import { readFile } from '../../common/FileReader';
const fullFilePath = __dirname + '/test_input.txt';
const sampleFilePath = __dirname + '/sample_input.txt';
const sampleInput = readFile(sampleFilePath);
const testInput = readFile(fullFilePath);

// Test the day1 function
import { solutionPartOne, solutionPartTwo } from './Day10';

test('Day 10 Part 1, passes sample input', () => {
    expect(solutionPartOne(sampleInput)).toBe(13140);
});

test('Day 10 Part 1', () => {
    expect(solutionPartOne(testInput)).toBe(12880);
});

test('Day 10 Part 2', () => {
    expect(solutionPartTwo(testInput)).toBe(
        '####..##....##..##..###....##.###..####.\n' +
            '#....#..#....#.#..#.#..#....#.#..#.#....\n' +
            '###..#.......#.#..#.#..#....#.#..#.###..\n' +
            '#....#.......#.####.###.....#.###..#....\n' +
            '#....#..#.#..#.#..#.#....#..#.#.#..#....\n' +
            '#.....##...##..#..#.#...................',
    );
});
