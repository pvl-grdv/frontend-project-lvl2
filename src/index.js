import _ from 'lodash';
import parser from './parsers.js';
import { readFile, getType } from './utils.js';
import render from './formatters';

const genDiffTree = (dataBefore, dataAfter) => {
  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter)).sort();
  const diff = allKeys.map((key) => {
    const valueOld = dataBefore[key];
    const valueNew = dataAfter[key];

    if (!_.has(dataBefore, key)) {
      return { name: key, type: 'new', value: valueNew };
    }
    if (!_.has(dataAfter, key)) {
      return { name: key, type: 'deleted', value: valueOld };
    }
    if (valueOld === valueNew) {
      return { name: key, type: 'unchanged', value: valueOld };
    }
    if (_.isObject(valueOld) && _.isObject(valueNew)) {
      return { name: key, type: 'nested', children: genDiffTree(valueOld, valueNew) };
    }
    return {
      name: key,
      type: 'changed',
      valueBefore: valueOld,
      valueAfter: valueNew,
    };
  });
  return diff;
};

export default (firstConfig, secondConfig, format) => {
  const dataBefore = parser(readFile(firstConfig), getType(firstConfig));
  const dataAfter = parser(readFile(secondConfig), getType(secondConfig));
  const diff = genDiffTree(dataBefore, dataAfter);
  console.log(JSON.stringify(diff, null, 4));
  return render(diff, format);
};
