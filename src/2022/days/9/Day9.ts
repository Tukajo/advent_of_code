export type RopeInstruction = {
    /**
     * The direction to move the head of the rope.
     */
    direction: string;

    /**
     * The number of times to repeat this instruction.
     */
    quantity: number;
};

export class ListNode {
    public pos: [number, number] = [0, 0]; // x, y
    next?: ListNode;

    public visits: Record<string, boolean> = { '0,0': true };

    public runInstruction = (direction: string): void => {
        let [x, y] = this.pos;
        switch (direction) {
            case 'R':
                x += 1;
                break;
            case 'L':
                x -= 1;
                break;
            case 'U':
                y += 1;
                break;
            case 'D':
                y -= 1;
                break;
        }
        this.pos = [x, y];
        this.next?.moveRope(this.pos);
    };
    public moveRope(parentPos: [number, number]): void {
        // Check to see if this node is adjacent to the parent node.
        const [x, y] = this.pos;
        const [parentX, parentY] = parentPos;
        const xDistance = Math.abs(x - parentX);
        const yDistance = Math.abs(y - parentY);
        // Find the move we need to make to bring ourselves within the moore neighborhood of the parent node.
        if (!(xDistance <= 1 && yDistance <= 1)) {
            this.pos[0] += Math.sign(parentX - x);
            this.pos[1] += Math.sign(parentY - y);
            // We only need to move the next node if this node had moved.
            this.next?.moveRope(this.pos);
        }
        this.visits[`${this.pos[0]},${this.pos[1]}`] = true;
    }
}
export const solutionPartOne = (input: string): number => {
    const rawInstructions = input.split('\n');
    const instructions = rawInstructions.map<RopeInstruction>((rawInstruction) => {
        const line = rawInstruction.split(' ');
        const direction = line[0];
        const quantity = parseInt(line[1]);
        return { direction, quantity };
    });
    const ropeHead = new ListNode();
    const ropeTail = new ListNode();
    ropeHead.next = ropeTail;

    instructions.forEach((instruction) => {
        let quantity = instruction.quantity;
        const { direction } = instruction;
        while (quantity > 0) {
            ropeHead.runInstruction(direction);
            quantity--;
        }
    });

    return Object.keys(ropeTail.visits).length;
};

export const solutionPartTwo = (input: string): number => {
    const rawInstructions = input.split('\n');
    const instructions = rawInstructions.map<RopeInstruction>((rawInstruction) => {
        const line = rawInstruction.split(' ');
        const direction = line[0];
        const quantity = parseInt(line[1]);
        return { direction, quantity };
    });
    const ropeHead = new ListNode();
    let nextNode = ropeHead;
    for (let i = 1; i < 10; i++) {
        // Create a new node and link it to the previous node.
        const newNode = new ListNode();
        nextNode.next = newNode;
        nextNode = newNode;
    }
    const ropeTail = nextNode;

    instructions.forEach((instruction) => {
        let quantity = instruction.quantity;
        const { direction } = instruction;
        while (quantity > 0) {
            ropeHead.runInstruction(direction);
            quantity--;
        }
    });

    return Object.keys(ropeTail.visits).length;
};
