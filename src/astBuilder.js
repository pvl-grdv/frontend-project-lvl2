import _ from 'lodash';

const astBuilder = (dataBefore, dataAfter) => {
  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter)).sort();

  return allKeys.map((key) => {
    const valueOld = dataBefore[key];
    const valueNew = dataAfter[key];

    if (!_.has(dataBefore, key)) {
      return { name: key, type: 'added', value: valueNew };
    }
    if (!_.has(dataAfter, key)) {
      return { name: key, type: 'deleted', value: valueOld };
    }
    if (_.isObject(valueOld) && _.isObject(valueNew)) {
      return { name: key, type: 'nested', children: astBuilder(valueOld, valueNew) };
    }
    if (valueOld !== valueNew) {
      return {
        name: key,
        type: 'changed',
        valueBefore: valueOld,
        valueAfter: valueNew,
      };
    }
    return { name: key, type: 'unchanged', value: valueOld };
  });
};

export default astBuilder;
