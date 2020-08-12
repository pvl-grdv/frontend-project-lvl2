import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const fileTypes = ['json', 'yml', 'ini'];
const fileFormats = ['nested', 'flat'];

const testArguments = fileFormats.flatMap((format) => (
  fileTypes.map((filetype) => [filetype, format])
));

test.each(testArguments)('type %s %s', (type, output) => {
  const before = getPath(`${output}Before.${type}`);
  const after = getPath(`${output}After.${type}`);
  const actual = genDiff(before, after, 'stylish');
  const expected = fs.readFileSync(getPath(`${output}Result`), 'utf-8');
  expect(actual).toBe(expected);
});
