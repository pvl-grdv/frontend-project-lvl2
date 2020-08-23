const outputValues = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getOutputValue = (value) => outputValues[(typeof value)](value);

const renderPlain = (diff) => {
  const iter = (data, pathName) => {
    const result = data.filter((node) => node.type !== 'unchanged').map((node) => {
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
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
    return result.join('\n');
  };
  return iter(diff, []);
};

export default renderPlain;
