export type FileSystemNodeType = {
    children: FileSystemNodeType[];
    name: string;
    type: string;
    size: number;
    parentNode?: FileSystemNodeType;
    getSize: () => number;
    addChild: (child: FileSystemNodeType) => void;
    printNode: (node: FileSystemNodeType, depth: number) => string;

    getDescendants: () => FileSystemNodeType[];
    getDescendantsByPredicate: (predicate: (node: FileSystemNodeType) => boolean) => FileSystemNodeType[];
};
export class FileSystem {
    public history: FileSystemNodeType[] = [];
    public root: FileSystemNodeType;
    constructor() {
        this.history = [];
        this.root = new FileSystemNode('/', 0, 'dir');
        this.history.push(this.root);
    }

    changeDirectory(dirName: string): void {
        const last = this.history[this.history.length - 1];
        if (dirName === '..' && last.name !== '/') {
            this.history.pop();
        } else {
            const child = last.children.find((child) => child.name === dirName);
            if (!child) {
                const newDir: FileSystemNodeType = new FileSystemNode(dirName, 0, 'dir');
                last.addChild(newDir);
                this.history.push(newDir);
            }
            if (child) {
                this.history.push(child);
            }
        }
    }
    addChild = (child: FileSystemNodeType): void => {
        const last = this.history[this.history.length - 1];
        child.parentNode = last;
        last.addChild(child);
    };

    printFileSystem = (): void => {
        console.log(this.root.printNode(this.root, 0));
    };
}

class FileSystemNode implements FileSystemNodeType {
    children: FileSystemNodeType[];
    name: string;
    parentNode?: FileSystemNodeType;
    type: string;

    size: number;
    constructor(name = 'root', size = 0, type: string, parentNode?: FileSystemNodeType) {
        this.children = [];
        this.name = name;
        this.parentNode = parentNode;
        this.size = size;
        this.type = type;
    }

    addChild(child: FileSystemNodeType): void {
        this.children.push(child);
    }

    /**
     * The getSize function returns the size of the node and all of its children, recursively.
     * @param node
     * @param depth
     */
    getSize = (): number => {
        let size = this.size;
        this.children.forEach((child) => {
            size += child.getSize();
        });
        return size;
    };

    printNode = (node: FileSystemNodeType, depth = 0): string => {
        let nodeAsText = `${' '.repeat(depth)}${node.type} : ${node.name} ${node.getSize()}\n`;
        node.children.forEach((child: FileSystemNodeType) => (nodeAsText += child.printNode(child, depth + 1)));
        return nodeAsText;
    };
    getDescendants = (): FileSystemNodeType[] => {
        const descendants: FileSystemNodeType[] = [];
        this.children.forEach((child) => {
            descendants.push(child, ...child.getDescendants());
        });
        return descendants;
    };

    getDescendantsByPredicate = (predicate: (node: FileSystemNodeType) => boolean): FileSystemNodeType[] => {
        const descendants: FileSystemNodeType[] = [];
        this.children.forEach((child) => {
            if (predicate(child)) {
                descendants.push(child);
            }
            descendants.push(...child.getDescendantsByPredicate(predicate));
        });
        return descendants;
    };
}
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
