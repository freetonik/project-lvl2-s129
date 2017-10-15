#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .description('Shows the difference between two configuration files.')
  .version('0.0.6')
  .arguments('<first_config> <second_config>')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((first, second) => {
    console.log(gendiff(first, second));
  });

program.parse(process.argv);
