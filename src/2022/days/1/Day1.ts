export const solution = (input: string): number => {
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
