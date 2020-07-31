import makeStylish from './stylish.js';

const outputFormat = {
  stylish: makeStylish,
};

export default (diff, format) => outputFormat[format](diff);
