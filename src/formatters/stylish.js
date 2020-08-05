import _ from 'lodash';

const initialIndent = 2;
const extraIndent = 4;
const generateIndent = (depth) => ' '.repeat(initialIndent + depth * extraIndent);

// const generateIndent = (n) => ' '.repeat(n);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item)
    .map(([key, value]) => `${generateIndent(depth + 1)}  ${key}: ${stringify(value)}`);
  return ['{', ...result, `${generateIndent(depth)}  }`].join('\n');
};

const render = (diff, depth = 0) => diff.map((node) => {
  const {
    type, name: key, value, valueBefore, valueAfter, children,
  } = node;

  switch (type) {
    case 'unchanged':
      return `${generateIndent(depth)}  ${key}: ${stringify(value, depth)}`;
    case 'new':
      return `${generateIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
    case 'deleted':
      return `${generateIndent(depth)}- ${key}: ${stringify(value, depth)}`;
    case 'changed':
      return `${generateIndent(depth)}- ${key}: ${stringify(valueBefore, depth)}\n${generateIndent(depth)}+ ${key}: ${stringify(valueAfter, depth)}`;
    case 'nested':
      return `${generateIndent(depth)}  ${key}: {\n${render(children, depth + 1)}\n${generateIndent(depth)}  }`;
    default:
      throw new Error(`Unknown node type: '${type}'`);
  }
}).join('\n');

export default (diff) => `{\n${render(diff)}\n}`;
