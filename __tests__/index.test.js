import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);

test('compare flat JSON', () => {
  const before = getPath('flatBefore.json');
  const after = getPath('flatAfter.json');
  const result = fs.readFileSync(getPath('flatResult'), 'utf-8');
  expect(genDiff(before, after)).toBe(result);
});
