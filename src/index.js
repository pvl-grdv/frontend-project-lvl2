import fs from 'fs';
import _ from 'lodash';

const readFile = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

const genDiff = (pathToFile1, pathToFile2) => {
  const dataBefore = readFile(pathToFile1);
  const dataAfter = readFile(pathToFile2);
  const allKeys = _.uniq(Object.keys(dataBefore), Object.keys(dataAfter));
  console.log(allKeys);
  const test = allKeys.map((key) => {
    if (!_.has(dataAfter, key)) {
      return [`  - ${key}: ${dataBefore[key]}`];
    }
    if (!_.has(dataBefore, key)) {
      return [`  + ${key}: ${dataAfter[key]}`];
    }
    if (dataBefore[key] !== dataAfter[key]) {
      return [`  - ${key}: ${dataBefore[key]}\n  + ${key}: ${dataAfter[key]}`];
    }
    return [`    ${key}: ${dataBefore[key]}`];
  });
  const test2 = test.join('\n');
  return `{\n${test2}\n}`;
};
export default genDiff;
