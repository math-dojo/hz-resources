#!/usr/bin/env node
const fs = require('fs');

const argv = require('yargs')
    .alias('a', 'authorisation')
    .nargs('a', 1)
    .describe('a', 'security token needed to allow operations against the cloud-api-provider')
    .alias('r', 'repository')
    .nargs('r', 1)
    .describe('r', 'path to the git repository with the changes to be compared')
    .normalize('r')
    .coerce('r', function (suppliedarg) {
        const status = fs.statSync(suppliedarg);
        if (status.isDirectory) {
            return suppliedarg;
        }

        throw new Error(`the value ${suppliedarg} is not a directory`);

    })
    .alias('s', 'source-branch')
    .nargs('s', 1)
    .describe('s', 'name of the branch with the changes to merge')
    .alias('t', 'target-branch')
    .nargs('t', 1)
    .describe('t', 'name of the branch which changes will be merged into')
    .alias('u', 'NodeJs cli utility to execute')
    .nargs('u', 1)
    .describe('u', 'the path to the utilitiy\'s entrypoint file')
    .normalize('u')
    .coerce('u', function (suppliedarg) {
        const status = fs.statSync(suppliedarg);
        if (/\.js$/.test(suppliedarg) && status.isFile) {
            return suppliedarg;
        }

        throw new Error(`the value ${suppliedarg} is not a javascript file`);

    })
    .help()
    .demandOption(['a', 'r', 's', 't', 'u'], 'Please provide all required arguments to work with this tool')
    .argv;