export type CycleInstruction = {
    cyclesRemaining: number;

    value: number;
};

/**
 * Generates the instructions, in reverse order to behave like a stack.
 * @param input
 */
const generateCycleInstructions = (input: string): CycleInstruction[] => {
    const lines = input.split('\r\n');
    return lines
        .map((line) => {
            const [instruction, value] = line.split(' ');
            const cyclesToCompleteInstruction = instruction === 'noop' ? 1 : 2;
            return {
                cyclesRemaining: cyclesToCompleteInstruction,
                value: parseInt(value || '0', 10),
            };
        })
        .reverse();
};

export const solutionPartOne = (input: string): number => {
    const instructionStack = generateCycleInstructions(input);
    let currInstruction = instructionStack.pop();
    let xRegister = 1;
    const registryHistory: number[] = [1];
    while (currInstruction) {
        // extract the instruction
        const value = currInstruction.value;
        let cyclesRemaining = currInstruction.cyclesRemaining;
        while (cyclesRemaining) {
            registryHistory.push(xRegister);
            cyclesRemaining--;
        }
        xRegister += value;
        currInstruction = instructionStack.pop();
    }
    return (
        registryHistory[20] * 20 +
        registryHistory[60] * 60 +
        registryHistory[100] * 100 +
        registryHistory[140] * 140 +
        registryHistory[180] * 180 +
        registryHistory[220] * 220
    );
};

export const solutionPartTwo = (input: string): string => {
    const instructionStack = generateCycleInstructions(input);
    let currInstruction = instructionStack.pop();
    let xRegister = 1;
    const CRTRows: string[][] = [];
    let currentCRTRow: string[] = [];
    while (currInstruction) {
        // extract the instruction
        const value = currInstruction.value;
        let cyclesRemaining = currInstruction.cyclesRemaining;
        while (cyclesRemaining > 0) {
            const distanceBetweenPixelAndClockCycle = Math.abs(currentCRTRow.length - xRegister);
            const currPixel = distanceBetweenPixelAndClockCycle <= 1 ? '#' : '.';
            currentCRTRow.push(currPixel);
            if (currentCRTRow.length >= 40) {
                CRTRows.push(currentCRTRow);
                currentCRTRow = [];
            }
            cyclesRemaining--;
        }
        xRegister += value;
        currInstruction = instructionStack.pop();
    }
    return CRTRows.map((row) => row.join('')).join('\n');
};
