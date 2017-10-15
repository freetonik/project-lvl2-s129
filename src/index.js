// @flow

import fs from 'fs';
import _ from 'lodash';

const getObjectDiff = (obj1, obj2) => {
  const unionedKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = [];

  _.forEach(unionedKeys, (key) => {
    // key present in both objects
    if (_.has(obj1, key) && _.has(obj2, key)) {
      // result.push(`    ${key}: ${obj1[key]}`);

      // same values
      if (_.isEqual(obj1[key], obj2[key])) {
        result.push(`    ${key}: ${obj2[key]}`);
      } else {
        result.push(`  + ${key}: ${obj2[key]}`);
        result.push(`  - ${key}: ${obj1[key]}`);
      }
    } else {
      // key present in 1st object only
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        result.push(`  - ${key}: ${obj1[key]}`);
      }

      // key present in 2nd object only
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        result.push(`  + ${key}: ${obj2[key]}`);
      }
    }
  });

  return `\n{\n${result.join('\n')}\n}\n`;
};

const gendiff = (firstConfigFilePath, secondConfigFilePath) => {
  const firstConfigFile = fs.readFileSync(firstConfigFilePath);
  const secondConfigFile = fs.readFileSync(secondConfigFilePath);

  const firstConfig = JSON.parse(firstConfigFile);
  const secondConfig = JSON.parse(secondConfigFile);

  return getObjectDiff(firstConfig, secondConfig);
};

export default gendiff;
