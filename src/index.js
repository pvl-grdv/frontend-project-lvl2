import _ from 'lodash';
import parser from './parsers.js';
import { readFile, getType } from './utils';

const genDiff = (configPath1, configPath2) => {
  const dataBefore = parser(readFile(configPath1), getType(configPath1));
  const dataAfter = parser(readFile(configPath2), getType(configPath2));

  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));

  const difference = allKeys.map((key) => {
    if (!_.has(dataBefore, key)) {
      return [`  + ${key}: ${dataAfter[key]}`];
    }
    if (!_.has(dataAfter, key)) {
      return [`  - ${key}: ${dataBefore[key]}`];
    }
    if (dataBefore[key] !== dataAfter[key]) {
      return [`  - ${key}: ${dataBefore[key]}\n  + ${key}: ${dataAfter[key]}`];
    }
    return [`    ${key}: ${dataBefore[key]}`];
  });
  return `{\n${difference.join('\n')}\n}`;
};

export default genDiff;
