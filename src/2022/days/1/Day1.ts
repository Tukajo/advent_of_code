export const solutionPartOne = (input: string): number => {
    let maxCalories = 0;
    let currentCalories = 0;
    input.split('\n').forEach((line) => {
        // Trim the line.
        const trimmedLine = line.trim();
        currentCalories = trimmedLine != '' ? currentCalories + parseInt(trimmedLine) : 0;
        if (currentCalories > maxCalories) {
            maxCalories = currentCalories;
        }
    });
    return maxCalories;
};

export const solutionPartTwo = (input: string): number => {
    const sums: number[] = [];
    let index = 0;
    input.split('\r\n').forEach((line) => {
        line !== '' ? (sums[index] = (sums[index] || 0) + parseInt(line)) : (index += 1);
    });
    return sums
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a + b);
};
