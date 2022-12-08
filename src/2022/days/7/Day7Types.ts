export type FileSystemNodeType = {
    /**
     * Children of the node.
     */
    children: FileSystemNodeType[];

    /**
     * Name of the node.
     */
    name: string;

    /**
     * Type of the node, either 'dir' or 'file'.
     */
    type: 'dir' | 'file';

    /**
     * Size of the node, in bytes.
     */
    size: number;

    /**
     * Pointer to the parent node.
     */
    parentNode?: FileSystemNodeType;

    /**
     * Function that recursively calculates the size of the node, including all of its descendants.
     */
    getSize: () => number;

    /**
     * Adds a child to the node.
     * @param child
     */
    addChild: (child: FileSystemNodeType) => void;

    /**
     * Prints the entire file system, starting from the current node.
     * @param node, the node to print
     * @param depth, tracks the depth of the node in the file system, for indentation purposes.
     */
    printNode: (node: FileSystemNodeType, depth: number) => string;

    /**
     * Returns all the descendants of a node.
     */
    getDescendants: () => FileSystemNodeType[];

    /**
     * Returns all descendants of the node that satisfy the predicate.
     */
    getDescendantsByPredicate: (predicate: (node: FileSystemNodeType) => boolean) => FileSystemNodeType[];
};

export type FileSystemType = {
    /**
     * Root node of the file system.
     */
    root: FileSystemNodeType;
    /**
     * Navigation History keeps track of the current node, and allows change directories to be undone.
     */
    navigationHistory: FileSystemNodeType[];

    /**
     * Changes the current directory to the specified directory, by pushing to or popping from the navigation history.
     * @param dirToNavigateTo
     */
    changeDirectory: (dirToNavigateTo: string) => void;

    /**
     * Adds a child to the current node's children, and places the current node as the parent node for the child.
     * @param child
     */
    addChild: (child: FileSystemNodeType) => void;

    /**
     * Returns the current node, which is the last element in the navigation history.
     */
    getCurrentWorkingDirectory: () => FileSystemNodeType;

    /**
     * Prints the entire file system, starting from the root node, and recursively printing all of its children.
     */
    printFileSystem: () => string;
};
