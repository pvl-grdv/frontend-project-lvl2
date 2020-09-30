import _ from 'lodash';

const generateIndent = (depth) => '  '.repeat(depth);
const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item)
    .map(([key, value]) => `${generateIndent(depth + 2)}  ${key}: ${stringify(value, depth + 2)}`);
  return ['{', ...result, `${generateIndent(depth)}  }`].join('\n');
};

const render = (diff, depth = 1) => {
  const result = diff.flatMap((node) => {
    const {
      type, name: key, value, valueBefore, valueAfter, children,
    } = node;

    switch (type) {
      case 'unchanged':
        return `${generateIndent(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'added':
        return `${generateIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${generateIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [`${generateIndent(depth)}- ${key}: ${stringify(valueBefore, depth)}`, `${generateIndent(depth)}+ ${key}: ${stringify(valueAfter, depth)}`];
      case 'nested':
        return `${generateIndent(depth)}  ${key}: ${render(children, depth + 2)}`;
      default:
        throw new Error(`Unknown node type: '${type}'`);
    }
  });
  return `{\n${result.join('\n')}\n${generateIndent(depth - 1)}}`;
};
export default render;
