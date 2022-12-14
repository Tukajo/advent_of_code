const ShapeMap: Record<string, string> = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors',
};

const KeyWinsAgainstValue: Record<string, string> = {
    Rock: 'Paper',
    Paper: 'Scissors',
    Scissors: 'Rock',
};
const ValueWinsAgainstKey: Record<string, string> = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
};
const PlayResponseMap: Record<string, (arg: string) => string> = {
    X: (playerOneChoice: string) => ValueWinsAgainstKey[playerOneChoice],
    Y: (playerOneChoice: string) => playerOneChoice,
    Z: (playerOneChoice: string) => KeyWinsAgainstValue[playerOneChoice],
};

const ScoreMap: Record<string, number> = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
    Victory: 6,
};

/**
 * Function that takes in two shapes and returns the winner index of 0 or 1. If there is a tie, return -1.
 * @param playerOneChoice
 * @param playerTwoChoice
 */
const decideWinner = (playerOneChoice: string, playerTwoChoice: string): number => {
    if (playerOneChoice === playerTwoChoice) {
        return -1;
    } else if (
        (playerOneChoice === 'Rock' && playerTwoChoice === 'Scissors') ||
        (playerOneChoice === 'Paper' && playerTwoChoice === 'Rock') ||
        (playerOneChoice === 'Scissors' && playerTwoChoice === 'Paper')
    ) {
        return 0;
    }
    // If it wasn't a tie, and player 1 didn't win, then player 2 must have won.
    return 1;
};

const evaluatePlay = (playerOneShape: string, playerTwoShape: string): number[] => {
    const roundScores = [0, 0];
    roundScores[0] += ScoreMap[playerOneShape];
    roundScores[1] += ScoreMap[playerTwoShape];
    const winnerIndex = decideWinner(playerOneShape, playerTwoShape);
    if (winnerIndex === -1) {
        // If there was a tie, then both players get 3 points
        roundScores[0] += 3;
        roundScores[1] += 3;
    } else {
        // Otherwise, increase the winner's score by 6
        roundScores[winnerIndex] += ScoreMap.Victory;
    }
    return roundScores;
};

export const solutionPartOne = (input: string): number => {
    const rounds: string[] = input.split('\r\n');
    // initialize the scores
    const scores = [0, 0];
    rounds.forEach((round) => {
        const playerOneShape = ShapeMap[round[0]];
        const playerTwoShape = ShapeMap[round[2]];
        const roundScores = evaluatePlay(playerOneShape, playerTwoShape);
        scores[0] += roundScores[0];
        scores[1] += roundScores[1];
    });

    return scores[1];
};

export const solutionPartTwo = (input: string): number => {
    // initialize the scores
    const rounds: string[] = input.split('\r\n');
    // initialize the scores
    const scores = [0, 0];
    rounds.forEach((round) => {
        const playerOneShape = ShapeMap[round[0]];
        const playerTwoShape = PlayResponseMap[round[2]](playerOneShape);
        const roundScores = evaluatePlay(playerOneShape, playerTwoShape);
        scores[0] += roundScores[0];
        scores[1] += roundScores[1];
    });

    return scores[1];
};
