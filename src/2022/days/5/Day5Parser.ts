/**
 * The CraneInstructionType provides three fields, the quantity of actions, the source index and the target index.
 */
export type CraneInstructionType = {
    quantity: number;
    sourceIndex: number;
    targetIndex: number;
};

export const prepareData = (fileContents: string): [CraneInstructionType[], string[][]] => {
    // First half of the data is the stack information.
    const dividingIndex = fileContents.indexOf('1');
    const rawStack = fileContents.slice(0, dividingIndex);
    const rawStackRows = rawStack.split('\r\n');
    // Remove numbers as they are useless.
    rawStackRows.pop();
    //TODO Translate the rawStackRows into stacks.
    const stackList: string[][] = [];
    for (let i = rawStackRows.length - 1; i >= 0; i -= 1) {
        const currentRow = rawStackRows[i];
        for (let j = 1; j <= currentRow.length; j += 4) {
            const stackIndex = Math.floor((j - 1) / 4);
            const currentStack: string[] = stackList[stackIndex] || [];
            if (currentRow[j] !== ' ') currentStack.push(currentRow[j]);
            stackList[stackIndex] = currentStack;
        }
    }

    // The remaining data is after the dividing index + 2.
    const rawInstructions = fileContents.slice(dividingIndex);
    const rawInstrictionRows = rawInstructions.split('\r\n');
    // Remove the first two rows as they are useless.
    rawInstrictionRows.shift();
    rawInstrictionRows.shift();
    const instructions = translateInstruction(rawInstrictionRows);
    return [instructions, stackList];
};

const translateInstruction = (rawInstructionArray: string[]): CraneInstructionType[] => {
    // A raw instruction looks like such: 'move 1 from 8 to 4'.
    return rawInstructionArray.map((rawInstruction) => {
        const instructionArray = rawInstruction.split(' ');
        const [_move, quantity, _from, sourceIndex, _to, targetIndex] = instructionArray;
        return {
            quantity: parseInt(quantity),
            sourceIndex: parseInt(sourceIndex),
            targetIndex: parseInt(targetIndex),
        };
    });
};

/**
 * Executes the prepared instructions on the prepared stacks.
 * Returns the print out of the items on top of the stacks.
 * @param instructions
 * @param stacks
 */
export const executeInstructionsCrateMover9000 = (instructions: CraneInstructionType[], stacks: string[][]): string => {
    instructions.forEach((instruction) => {
        const { quantity, sourceIndex, targetIndex } = instruction;
        const sourceStack = stacks[sourceIndex - 1];
        const targetStack = stacks[targetIndex - 1];
        let iterCount = quantity;
        while (iterCount > 0) {
            const item = sourceStack.pop()!;
            targetStack.push(item);
            iterCount -= 1;
        }
    });
    // Print out the top of the stacks.
    return stacks.map((stack) => stack[stack.length - 1]).join('');
};
export const executeInstructionsCrateMover9001 = (instructions: CraneInstructionType[], stacks: string[][]): string => {
    instructions.forEach((instruction) => {
        const { quantity, sourceIndex, targetIndex } = instruction;
        const sourceStack = stacks[sourceIndex - 1];
        const targetStack = stacks[targetIndex - 1];
        const items = sourceStack.splice(sourceStack.length - quantity, quantity);
        targetStack.push(...items);
    });
    // Print out the top of the stacks.
    return stacks.map((stack) => stack[stack.length - 1]).join('');
};
