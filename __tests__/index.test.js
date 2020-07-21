import fs from 'fs';
import { dirname, path } from 'path';
import genDiff from '../src';

const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join('__tests__/__fixtures__/', `${filename}`);

test('compare flat JSON', () => {
  const before = getFixturePath('flatBefore.json');
  const after = getFixturePath('flatAfter.json');
  const result = fs.readFileSync(path.resolve(__dirname, getFixturePath('flatResult')), 'utf-8');
  expect(genDiff(before, after)).toBe(result);
});
