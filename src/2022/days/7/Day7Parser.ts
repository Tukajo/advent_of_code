import { FileSystemNodeType, FileSystemType } from './Day7Types';

export class FileSystem implements FileSystemType {
    /**
     * Root node of the file system.
     */
    public root: FileSystemNodeType;

    /**
     * Navigation History keeps track of the current node, and allows change directories to be undone.
     */
    public navigationHistory: FileSystemNodeType[] = [];

    constructor() {
        this.navigationHistory = [];
        this.root = new FileSystemNode('/', 0, 'dir');
        this.navigationHistory.push(this.root);
    }

    /**
     * Changes the current directory to the specified directory, by pushing to or popping from the navigation history.
     * @param dirToNavigateTo
     */
    changeDirectory(dirToNavigateTo: string): void {
        const currentWorkingNode = this.getCurrentWorkingDirectory();
        if (dirToNavigateTo === '..' && currentWorkingNode.name !== '/') {
            this.navigationHistory.pop();
        } else {
            // Check if the directory exists under the current working directory already.
            const child = currentWorkingNode.children.find((child) => child.name === dirToNavigateTo);
            if (!child) {
                // If not, create it, and add it to the history.
                const newDir: FileSystemNodeType = new FileSystemNode(dirToNavigateTo, 0, 'dir');
                currentWorkingNode.addChild(newDir);
                this.navigationHistory.push(newDir);
            } else if (child) {
                // If it does, add it to the history.
                this.navigationHistory.push(child);
            }
        }
    }

    /**
     * Adds a child to the current node's children, and places the current node as the parent node for the child.
     * @param child
     */
    addChild = (child: FileSystemNodeType): void => {
        const currentWorkingNode = this.getCurrentWorkingDirectory();
        child.parentNode = currentWorkingNode;
        currentWorkingNode.addChild(child);
    };

    /**
     * Returns the current node, which is the last element in the navigation history.
     */
    getCurrentWorkingDirectory = (): FileSystemNodeType => {
        return this.navigationHistory[this.navigationHistory.length - 1];
    };

    /**
     * Prints the entire file system, starting from the root node, and recursively printing all of its children.
     */
    printFileSystem = (): string => {
        return this.root.printNode(this.root, 0);
    };
}

class FileSystemNode implements FileSystemNodeType {
    /**
     * Children of the node.
     */
    children: FileSystemNodeType[];

    /**
     * Name of the node.
     */
    name: string;

    /**
     * Pointer to the parent node.
     */
    parentNode?: FileSystemNodeType;

    /**
     * Type of the node, either 'dir' or 'file'.
     */
    type: 'dir' | 'file';

    /**
     * Size of the node, in bytes.
     */
    size: number;

    constructor(name = 'root', size = 0, type: 'dir' | 'file', parentNode?: FileSystemNodeType) {
        this.children = [];
        this.name = name;
        this.parentNode = parentNode;
        this.size = size;
        this.type = type;
    }

    /**
     * Adds a child to the node.
     * @param child
     */
    addChild(child: FileSystemNodeType): void {
        this.children.push(child);
    }

    /**
     * Function that recursively calculates the size of the node, including all of its descendants.
     */
    getSize = (): number => {
        let cumulativeSize = this.size;
        this.children.forEach((child) => {
            cumulativeSize += child.getSize();
        });
        return cumulativeSize;
    };

    /**
     *  Prints the entire file system, starting from the current node.
     * @param node, the node to print
     * @param depth, tracks the depth of the node in the file system, for indentation purposes.
     */
    printNode = (node: FileSystemNodeType, depth = 0): string => {
        let nodeAsText = `${' '.repeat(depth)}${node.type} : ${node.name} ${node.getSize()}\n`;
        node.children.forEach((child: FileSystemNodeType) => (nodeAsText += child.printNode(child, depth + 1)));
        return nodeAsText;
    };

    /**
     * Returns all the descendants of a node.
     */
    getDescendants = (): FileSystemNodeType[] => {
        const descendants: FileSystemNodeType[] = [];
        this.children.forEach((child) => {
            descendants.push(child, ...child.getDescendants());
        });
        return descendants;
    };

    /**
     * Returns all descendants of the node that satisfy the predicate.
     * @param predicate, a function that takes a node and returns a boolean.
     */
    getDescendantsByPredicate = (predicate: (node: FileSystemNodeType) => boolean): FileSystemNodeType[] => {
        const descendants: FileSystemNodeType[] = [];
        this.children.forEach((child) => {
            if (predicate(child)) {
                descendants.push(child);
            }
            // We still need to check the descendants of the child, even if the child itself doesn't satisfy the predicate.
            descendants.push(...child.getDescendantsByPredicate(predicate));
        });
        return descendants;
    };
}

/**
 * Parses the input, and returns a FileSystem object.
 * @param input, some text that represents a user navigating through a file system.
 */
export const generateFileSystem = (input: string): FileSystem => {
    // Split on $ cd to get directories.
    const splitData = input.split('\r\n');
    const fileSystem = new FileSystem();

    splitData.forEach((line) => {
        if (line.startsWith('$ cd')) {
            const directoryName = line.split(' ')[2];
            fileSystem.changeDirectory(directoryName);
        } else if (!line.startsWith('$')) {
            // Determine if we are dealing with a file or directory.
            const [d1, d2] = line.split(' ');
            if (d1 !== 'dir') {
                const newNode = new FileSystemNode(d2, parseInt(d1), 'file');
                fileSystem.addChild(newNode);
            }
        }
    });
    return fileSystem;
};
