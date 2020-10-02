import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (tree, format) => {
  const outputFormats = {
    nested: makeStylish,
    plain: makePlain,
    json: JSON.stringify,
  };
  return outputFormats[format](tree);
};
