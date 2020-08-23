import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const fileTypes = ['json', 'yml', 'ini'];
const outputTypes = ['nested', 'plain'];

const testArguments = outputTypes.flatMap((format) => (
  fileTypes.map((filetype) => [filetype, format])
));

console.log(testArguments);

test.each(testArguments)('type: %s, output format: %s', (type, format) => {
  const before = getPath(`nestedBefore.${type}`);
  const after = getPath(`nestedAfter.${type}`);
  const actual = genDiff(before, after, format);
  const expected = fs.readFileSync(getPath(`${format}Result`), 'utf-8');
  expect(actual).toBe(expected);
});
