/* eslint-disable array-callback-return */

const getOutputValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const renderPlain = (diff) => {
  const iter = (data, pathName) => {
    const result = data.flatMap((node) => {
      const {
        name, type, value, valueBefore, valueAfter, children,
      } = node;

      const fullName = pathName ? [...pathName, name].join('.') : name;

      switch (type) {
        case 'added':
          return `Property '${fullName}' was added with value: ${getOutputValue(value)}`;
        case 'deleted':
          return `Property '${fullName}' was removed`;
        case 'changed':
          return `Property '${fullName}' was updated. From ${getOutputValue(valueBefore)} to ${getOutputValue(valueAfter)}`;
        case 'nested':
          return iter(children, [...pathName, name]);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
    return result.join('\n');
  };
  return iter(diff, []);
};

export default renderPlain;
