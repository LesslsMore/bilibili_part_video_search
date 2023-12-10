import { basename, extname } from 'path';

const filePath = '/path/to/file.txt';
const fileNameWithoutExt = basename(filePath, extname(filePath));

console.log(fileNameWithoutExt); // 'file'