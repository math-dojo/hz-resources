#!/usr/bin/env node

const argv = require('yargs')
    .alias('a', 'authorisation')
    .nargs('a', 1)
    .describe('a', 'security token needed to allow operations against the cloud-api-provider')
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
    .demandOption(['a', 'r', 's', 't'], 'Please provide both repository, source-branch and target-branch arguments to work with this tool')
    .argv;