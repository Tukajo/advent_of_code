//Could do some charCode stuff but I am lazy atm.

const valueMap: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
};
export const solutionPartOne = (input: string): number => {
    const rucksacks = input.split('\r\n');
    const prioItems: string[] = [];
    rucksacks.forEach((ruckSackContents) => {
        let leftPtr = 0;
        let rightPtr = ruckSackContents.length - 1;
        const leftMem: Record<string, number> = {};
        const rightMem: Record<string, number> = {};
        while (leftPtr <= rightPtr) {
            // Check if seen already.
            if (!rightMem[ruckSackContents[leftPtr]]) {
                leftMem[ruckSackContents[leftPtr]] = 1;
            } else {
                prioItems.push(ruckSackContents[leftPtr]);
                break;
            }
            if (!leftMem[ruckSackContents[rightPtr]]) {
                rightMem[ruckSackContents[rightPtr]] = 1;
            } else {
                prioItems.push(ruckSackContents[rightPtr]);
                break;
            }
            leftPtr++;
            rightPtr--;
        }
    });
    // reduce the prioItems to their values.
    return prioItems.reduce((acc, item) => acc + valueMap[item], 0);
};

export const solutionPartTwo = (input: string): number => {
    const rucksacks = input.split('\r\n');
    const prioItems: string[] = [];
    for (let i = 2; i < rucksacks.length; i += 3) {
        const subGroupOne = rucksacks[i - 2];
        const subGroupTwo = rucksacks[i - 1];
        const subGroupThree = rucksacks[i];
        const memArrays: Record<string, number>[] = [{}, {}, {}];
        let ptr = 0;
        // So long as we have at least one "truthy" value amongst the three groups, we can continue.
        while (subGroupOne[ptr] || subGroupTwo[ptr] || subGroupThree[ptr]) {
            if (subGroupOne[ptr]) {
                memArrays[0][subGroupOne[ptr]] = 1;
                // Check other two groups for this item.
                if (memArrays[1][subGroupOne[ptr]] && memArrays[2][subGroupOne[ptr]]) {
                    prioItems.push(subGroupOne[ptr]);
                    break;
                }
            }
            if (subGroupTwo[ptr]) {
                memArrays[1][subGroupTwo[ptr]] = 1;
                // Check other two groups for this item.
                if (memArrays[0][subGroupTwo[ptr]] && memArrays[2][subGroupTwo[ptr]]) {
                    prioItems.push(subGroupTwo[ptr]);
                    break;
                }
            }
            if (subGroupThree[ptr]) {
                memArrays[2][subGroupThree[ptr]] = 1;
                // Check other two groups for this item.
                if (memArrays[0][subGroupThree[ptr]] && memArrays[1][subGroupThree[ptr]]) {
                    prioItems.push(subGroupThree[ptr]);
                    break;
                }
            }
            ptr++;
        }
    }
    // TODO Can clean this code up better.
    // reduce the prioItems to their values.
    return prioItems.reduce((acc, item) => acc + valueMap[item], 0);
};
