import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const outputFormat = {
  nested: makeStylish,
  plain: makePlain,
  json: makeJson,
};

export default (tree, format) => outputFormat[format](tree);
