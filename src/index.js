import fs from 'fs';
import _ from 'lodash';

const readFile = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

const genDiff = (pathToFile1, pathToFile2) => {
  const dataBefore = readFile(pathToFile1);
  const dataAfter = readFile(pathToFile2);

  const allKeys = _.uniq(Object.keys(dataBefore), Object.keys(dataAfter));
  const difference = allKeys.map((key) => {
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
  return `{\n${difference.join('\n')}\n}`;
};
export default genDiff;
