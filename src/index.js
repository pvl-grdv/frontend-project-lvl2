import parser from './parsers.js';
import { readFile, getType } from './utils.js';
import render from './formatters';
import astBuilder from './astBuilder.js';

export default (firstConfig, secondConfig, format) => {
  const dataBefore = parser(readFile(firstConfig), getType(firstConfig));
  const dataAfter = parser(readFile(secondConfig), getType(secondConfig));
  const diff = astBuilder(dataBefore, dataAfter);

  return render(diff, format);
};
