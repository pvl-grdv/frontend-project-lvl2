import fs from 'fs';
import path from 'path';

export const readFile = (configPath) => fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf-8');
export const getType = (configPath) => path.extname(configPath).slice(1);
