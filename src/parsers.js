import yaml from 'js-yaml';

const extension = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (data, ext) => {
  const parse = extension[ext];
  return parse(data);
};
