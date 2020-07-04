#!/usr/bin/env node

const argv = require('yargs')
    .alias('r', 'repository')
    .nargs('r', 1)
    .describe('r', 'path to the git repository with the changes to be compared')
    .normalize('r')
    .help()
    .argv;