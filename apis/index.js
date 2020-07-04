#!/usr/bin/env node

const argv = require('yargs')
    .alias('r', 'repository')
    .nargs('r', 1)
    .describe('r', 'path to the git repository with the changes to be compared')
    .normalize('r')
    .alias('s', 'source-branch')
    .nargs('s', 1)
    .describe('s', 'name of the branch with the changes to merge')
    .alias('t', 'target-branch')
    .nargs('t', 1)
    .describe('t', 'name of the branch which changes will be merged into')
    .help()
    .demandOption(['r', 's', 't'], 'Please provide both repository, source-branch and target-branch arguments to work with this tool')
    .argv;