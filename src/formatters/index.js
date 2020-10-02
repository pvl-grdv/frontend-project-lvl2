import makeStylish from './stylish.js';
import makePlain from './plain.js';

const outputFormats = {
  nested: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

export default (tree, format) => {
  const formatTree = outputFormats[format];
  return formatTree(tree);
};
