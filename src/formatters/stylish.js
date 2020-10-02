import _ from 'lodash';

const indent = 2;
const generateIndent = (depth) => '  '.repeat(depth * indent);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item)
    .map(([key, value]) => `${generateIndent(depth + 1)}    ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...result, `${generateIndent(depth + 1)}}`].join('\n');
};

const render = (diff, depth = 0) => {
  const result = diff.flatMap((node) => {
    const {
      type, name: key, value, valueBefore, valueAfter, children,
    } = node;

    switch (type) {
      case 'unchanged':
        return `${generateIndent(depth)}    ${key}: ${stringify(value, depth)}`;
      case 'added':
        return `${generateIndent(depth)}  + ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${generateIndent(depth)}  - ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${generateIndent(depth)}  - ${key}: ${stringify(valueBefore, depth)}`,
          `${generateIndent(depth)}  + ${key}: ${stringify(valueAfter, depth)}`,
        ];
      case 'nested':
        return `${generateIndent(depth)}    ${key}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: '${type}'`);
    }
  });
  return ['{', ...result, `${generateIndent(depth)}}`].join('\n');
};
export default (diff) => render(diff);
