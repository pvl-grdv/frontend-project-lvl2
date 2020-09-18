#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format [nested, plain, json]', 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
