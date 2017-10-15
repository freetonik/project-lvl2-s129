// @flow

import gendiff from '../src';

const diff = `
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
`;

test('gendiff_json', () => {
  const beforeJsonFile = '__tests__/__fixtures__/before.json';
  const afterJsonFile = '__tests__/__fixtures__/after.json';
  expect(gendiff(beforeJsonFile, afterJsonFile)).toEqual(diff);
});
