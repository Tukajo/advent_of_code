// Utility function to read the input from a file.

import * as fs from 'fs';
export const readFile = (path: string): string => fs.readFileSync(path, 'utf8');
