import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);

const fileTypes = ['json', 'yml', 'ini'];
const outputFormats = ['complex'];

const testArguments = outputFormats.flatMap((format) => (
  fileTypes.map((filetype) => [filetype, format])
));

const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

test.each(testArguments)('type %s & output %s', (type, output) => {
  const before = getPath(`${output}Before.${type}`);
  const after = getPath(`${output}After.${type}`);
  const actual = genDiff(before, after, 'stylish');
  const expected = readFile(`${output}Result`);
  expect(actual).toBe(expected);
});
