export const solution = (input: string): number => {
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
