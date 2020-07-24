import fs from 'fs';
import path from 'path';

export const readFile = (configPath) => fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf-8'); // читаем файл
export const getExt = (configPath) => path.extname(configPath); // читаем расширение
