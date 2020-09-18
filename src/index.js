import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import astBuilder from './astBuilder.js';

const readFile = (configPath) => fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf-8');
const getType = (configPath) => path.extname(configPath).slice(1);

export default (firstConfig, secondConfig, format) => {
  const dataBefore = parse(readFile(firstConfig), getType(firstConfig));
  const dataAfter = parse(readFile(secondConfig), getType(secondConfig));
  const diff = astBuilder(dataBefore, dataAfter);

  return render(diff, format);
};
