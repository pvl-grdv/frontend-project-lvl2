import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParser = (content) => {
  const data = ini.parse(content);

  const iter = (node) => Object.entries(node).reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return { ...acc, [key]: iter(value) };
    }
    if (typeof (value) === 'boolean') {
      return { ...acc, [key]: value };
    }
    if (!Number.isNaN(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    return { ...acc, [key]: value };
  }, {});

  return iter(data);
};

const ymlParser = (content) => {
  const data = yaml.safeLoad(content);

  const iter = (node) => Object.entries(node).reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return { ...acc, [key]: iter(value) };
    }
    if (typeof (value) === 'boolean') {
      return { ...acc, [key]: value };
    }
    if (!Number.isNaN(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    return { ...acc, [key]: value };
  }, {});

  return iter(data);
};

const parsers = {
  json: JSON.parse,
  yml: ymlParser,
  yaml: ymlParser,
  ini: iniParser,
};

export default (data, type) => parsers[type](data);
