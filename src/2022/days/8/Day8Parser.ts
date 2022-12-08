export const createMatrix = (input: string): number[][] =>
    input.split('\r\n').map((row) => row.split('').map((treeHeight) => parseInt(treeHeight)));

export type TreeDirectionVisibility = {
    NORTH?: boolean;
    SOUTH?: boolean;
    EAST?: boolean;
    WEST?: boolean;
};
/**
 * From each cardinal direction, count the number of trees encountered that are taller than the tallest previously encountered tree.
 */
export const walkForest = (forestMatrix: number[][]): number => {
    // Approach from the West heading East.
    const m: Record<string, TreeDirectionVisibility> = {};
    let tallestHeightSeen = -Infinity;
    for (let x = 0; x < forestMatrix.length; x++) {
        // Reset the tallest height seen, and walk the next row.
        tallestHeightSeen = -Infinity;
        const forestLine = forestMatrix[x];
        for (let y = 0; y < forestLine.length; y++) {
            const height = forestLine[y];
            if (height > tallestHeightSeen) {
                tallestHeightSeen = height;
                const treeKey = `${x},${y}`;
                const oldVisibility = m[treeKey];
                m[`${x},${y}`] = { ...oldVisibility, WEST: true };
            }
        }
    }

    // Approach from the East heading West.
    for (let x = forestMatrix.length - 1; x >= 0; x--) {
        // Reset the tallest height seen, and walk the next row.
        tallestHeightSeen = -Infinity;
        const forestLine = forestMatrix[x];
        for (let y = forestLine.length - 1; y >= 0; y--) {
            const height = forestLine[y];
            if (height > tallestHeightSeen) {
                tallestHeightSeen = height;
                const treeKey = `${x},${y}`;
                const oldVisibility = m[treeKey];
                m[`${x},${y}`] = { ...oldVisibility, EAST: true };
            }
        }
    }

    // Approach from the North heading South.
    for (let y = 0; y < forestMatrix[0].length; y++) {
        // Reset the tallest height seen, and walk the next column.
        tallestHeightSeen = -Infinity;
        for (let x = 0; x < forestMatrix.length; x++) {
            const height = forestMatrix[x][y];
            if (height > tallestHeightSeen) {
                tallestHeightSeen = height;
                const treeKey = `${x},${y}`;
                const oldVisibility = m[treeKey];
                m[`${x},${y}`] = { ...oldVisibility, NORTH: true };
            }
        }
    }

    // Approach from the South heading North.
    for (let y = forestMatrix[0].length - 1; y >= 0; y--) {
        // Reset the tallest height seen, and walk the next column.
        tallestHeightSeen = -Infinity;
        for (let x = forestMatrix.length - 1; x >= 0; x--) {
            const height = forestMatrix[x][y];
            if (height > tallestHeightSeen) {
                tallestHeightSeen = height;
                const treeKey = `${x},${y}`;
                const oldVisibility = m[treeKey];
                m[`${x},${y}`] = { ...oldVisibility, SOUTH: true };
            }
        }
    }

    // From the map, generate an array from the keys, and filter out the trees that are not visible from at least one direction.
    const visibleTrees = Object.keys(m).filter((treeKey) => {
        const visibility = m[treeKey];
        return visibility.NORTH || visibility.SOUTH || visibility.EAST || visibility.WEST;
    });
    return visibleTrees.length;
};

export const findMostScenicTree = (forestMatrix: number[][]): number => {
    let maxScenicScore = -Infinity;
    const treeCoordintes: [number, number] = [-1, -1];
    forestMatrix.forEach((forestLine, x) =>
        forestLine.forEach((_tree, y) => {
            const scenicScore = checkScenicScore(x, y, forestMatrix);
            if (scenicScore > maxScenicScore) {
                maxScenicScore = scenicScore;
                treeCoordintes[0] = x;
                treeCoordintes[1] = y;
            }
        }),
    );
    console.log(`The most scenic tree is at (${treeCoordintes[0]}, ${treeCoordintes[1]})`);
    return maxScenicScore;
};

const checkScenicScore = (xCoordinate: number, yCoordinate: number, forestMatrix: number[][]): number => {
    // A scenic score is the product of the number of trees visible from a particular tree, in each cardinal direction.
    // Visibility is defined as the number of trees that are taller than the tree being examined.
    // TODO Refactor this to be more DRY.
    const candidateSiteHeight = forestMatrix[xCoordinate][yCoordinate];
    // Check East
    let easterlyScenicScore = 0;
    for (let x = xCoordinate + 1; x < forestMatrix.length; x++) {
        const height = forestMatrix[x][yCoordinate];
        if (height >= candidateSiteHeight) {
            easterlyScenicScore++;
            break;
        }
        easterlyScenicScore++;
    }

    // Check West
    let westerlyScenicScore = 0;
    for (let x = xCoordinate - 1; x >= 0; x--) {
        const height = forestMatrix[x][yCoordinate];
        if (height >= candidateSiteHeight) {
            westerlyScenicScore++;
            break;
        }
        westerlyScenicScore++;
    }

    // Check North
    let northernScenicScore = 0;
    for (let y = yCoordinate - 1; y >= 0; y--) {
        const height = forestMatrix[xCoordinate][y];
        if (height >= candidateSiteHeight) {
            northernScenicScore++;
            break;
        }
        northernScenicScore++;
    }

    // Check South
    let southernScenicScore = 0;
    for (let y = yCoordinate + 1; y < forestMatrix[0].length; y++) {
        const height = forestMatrix[xCoordinate][y];
        if (height >= candidateSiteHeight) {
            southernScenicScore++;
            break;
        }
        southernScenicScore++;
    }
    return northernScenicScore * westerlyScenicScore * easterlyScenicScore * southernScenicScore;
};
