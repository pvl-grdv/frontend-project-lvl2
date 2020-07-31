import _ from 'lodash';

const initialIndent = 2;
const extraIndent = 4;
const generateIndent = (depth) => ' '.repeat(initialIndent + depth * extraIndent);

const getString = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  return Object.entries(item)
    .map(([key, value]) => `{\n${generateIndent(depth + 1)}  ${key}: ${getString(value)}\n${generateIndent(depth)}  }`);
};

const render = (diff, depth = 0) => diff.map((node) => {
  const {
    type, name: key, value, valueBefore, valueAfter, children,
  } = node;

  switch (type) {
    case 'unchanged':
      return `${generateIndent(depth)}  ${key}: ${getString(value, depth)}`;
    case 'new':
      return `${generateIndent(depth)}+ ${key}: ${getString(value, depth)}`;
    case 'deleted':
      return `${generateIndent(depth)}- ${key}: ${getString(value, depth)}`;
    case 'changed':
      return `${generateIndent(depth)}- ${key}: ${getString(valueBefore, depth)}\n${generateIndent(depth)}+ ${key}: ${getString(valueAfter, depth)}`;
    case 'nested':
      return `${generateIndent(depth)}  ${key}: {\n${render(children, depth + 1)}\n${generateIndent(depth)}  }`;
    default:
      throw new Error(`Unknown node type: '${type}'`);
  }
}).join('\n');

export default (diff) => `{\n${render(diff)}\n}`;
