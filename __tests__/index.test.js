import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getPath = (filename) => path.join('__fixtures__', filename);

const fileFormats = ['json', 'yml', 'ini'];
const outputTypes = ['nested', 'plain', 'json'];

const testArguments = outputTypes.flatMap((format) => (
  fileFormats.map((filetype) => [filetype, format])
));

test.each(testArguments)('File format: %s, output type: %s', (fileFormat, outputType) => {
  const before = getPath(`before.${fileFormat}`);
  const after = getPath(`after.${fileFormat}`);
  const actual = genDiff(before, after, outputType);
  const expected = fs.readFileSync(getPath(`${outputType}Result`), 'utf-8');
  expect(actual).toBe(expected);
});
