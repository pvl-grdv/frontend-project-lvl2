import makeStylish from './stylish.js';
import makePlain from './plain.js';

const outputFormat = {
  nested: makeStylish,
  plain: makePlain,
};

export default (tree, format) => outputFormat[format](tree);
