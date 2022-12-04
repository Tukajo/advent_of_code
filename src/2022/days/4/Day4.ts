export const solutionPartOne = (input: string): number => {
    const pairs = input.split('\r\n').map((line) => line.split(','));
    let fullOverlapCount = 0;
    pairs.forEach((pairs) => {
        const [firstPair, secondPair] = pairs;
        const numOneStart = parseInt(firstPair.split('-')[0]);
        const numOneEnd = parseInt(firstPair.split('-')[1]);
        const numTwoStart = parseInt(secondPair.split('-')[0]);
        const numTwoEnd = parseInt(secondPair.split('-')[1]);
        if (numOneStart <= numTwoStart && numOneEnd >= numTwoEnd) {
            fullOverlapCount += 1;
        } else if (numTwoStart <= numOneStart && numTwoEnd >= numOneEnd) {
            fullOverlapCount += 1;
        }
    });
    return fullOverlapCount;
};

export const solutionPartTwo = (input: string): number => {
    const pairs = input.split('\r\n').map((line) => line.split(','));
    let fullOverlapCount = 0;
    pairs.forEach((pairs) => {
        const [firstPair, secondPair] = pairs;
        const numOneStart = parseInt(firstPair.split('-')[0]);
        const numOneEnd = parseInt(firstPair.split('-')[1]);
        const numTwoStart = parseInt(secondPair.split('-')[0]);
        const numTwoEnd = parseInt(secondPair.split('-')[1]);
        // find if any of the ranges overlap
        // TODO This should get cleaned lmao
        if (numOneStart <= numTwoStart && numOneEnd >= numTwoStart) {
            fullOverlapCount += 1;
        } else if (numTwoStart <= numOneStart && numTwoEnd >= numOneStart) {
            fullOverlapCount += 1;
        } else if (numOneStart <= numTwoEnd && numOneEnd >= numTwoEnd) {
            fullOverlapCount += 1;
        } else if (numTwoStart <= numOneEnd && numTwoEnd >= numOneEnd) {
            fullOverlapCount += 1;
        } else if (numOneStart === numTwoStart && numOneEnd === numTwoEnd) {
            fullOverlapCount += 1;
        } else if (numOneStart === numTwoEnd && numOneEnd === numTwoStart) {
            fullOverlapCount += 1;
        }
    });
    return fullOverlapCount;
};
