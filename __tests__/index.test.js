import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);

const fileTypes = ['json', 'yml', 'ini'];
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

test.each(fileTypes)('type %s', (type) => {
  const before = getPath(`flatBefore.${type}`);
  const after = getPath(`flatAfter.${type}`);
  const actual = genDiff(before, after);
  const expected = readFile('flatResult');
  expect(actual).toBe(expected);
});
