const WINDOW_SIZE_OFFSET = 3;
const MARKER_OFFSET = 1;
export const solutionPartOne = (input: string): number => {
    // slide over the input string and check if the 4 characters are distinct
    for (let i = 0; i < input.length - 3; i++) {
        const current = input[i];
        const next = input[i + 1];
        const next2 = input[i + 2];
        const next3 = input[i + 3];
        if (
            current !== next &&
            current !== next2 &&
            current !== next3 &&
            next !== next2 &&
            next !== next3 &&
            next2 !== next3
        ) {
            return i + MARKER_OFFSET + WINDOW_SIZE_OFFSET;
        }
    }
    return 0;
};

export const solutionPartTwo = (input: string): number => {
    // slide over the input string and check if the 4 characters are distinct
    for (let i = 0; i < input.length - 13; i++) {
        const slice = input.slice(i, i + 14);
        const set = new Set(slice);
        if (set.size === 14) {
            return i + MARKER_OFFSET + 13;
        }
    }
    return 0;
};
