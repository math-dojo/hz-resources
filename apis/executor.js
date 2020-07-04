const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const exec = util.promisify(require('child_process').exec);
const path = require('path');

import simplegit from 'simple-git';

/**
 * This is a class responsible for performing the comparison of changes between
 * two branches, applying them and rolling back in the event of any failures.
 */
class Executor {
    /**
     * Initialises an Executor.
     * @param {Object} executorConfig - The config for the executor
     * @param {string} executorConfig.targetBranchName - name of the branch which changes will merged into
     * @param {string} executorConfig.sourceBranchName - name of the branch with changes to merge
     * @param {string} executorConfig.repoPath - path to the git repository with the changes to be compared
     * @param {string} executorConfig.cloudProviderAuthorisationToken - security token needed to allow operations against the cloud-api-provider
     * @param {string} executorConfig.utilityPath - the path to the utilitiy's entrypoint file
     * @param executorConfig.childProcessExecutorFunction - function that will be used to create a sub-process for executing the utility. It is exposed for the purposes of unit testing
     */
    constructor({
        targetBranchName,
        sourceBranchName,
        repoPath,
        cloudProviderAuthorisationToken,
        utilityPath,
        childProcessExecutorFunction = execFile
    }) {
        const normalisedRepoPath = path.normalize(repoPath);
        const git = simplegit(normalisedRepoPath, {
            binary: 'git'
        })

        this.git = git;
        this.nodePath = exec('which node')
            .then(({ stdout, stderr }) => {
                const nodeRegeEx = /\/(.+)\/node$/;
                const searchResult = nodeRegeEx.exec(stdout.trim());
                const nodeLocation = searchResult ? searchResult[0] : null;

                if (nodeLocation) {
                    logger.info(`node executable found: ${stdout}`);
                    return Promise.resolve(nodeLocation);
                }
                logger.error(`node could not be found because: ${stderr}`);
                return Promise.reject(new Error(`node could not be found because: ${stderr}`))

            })
        this.targetBranchName = targetBranchName;
        this.sourceBranchName = sourceBranchName;
        this.cloudProviderAuthorisationToken = cloudProviderAuthorisationToken;
        this.utilityPath = path.normalize(utilityPath);
        this.execFile = childProcessExecutorFunction;
    }

    execute() {

    }

    /**
     * Identify modified files
     * @param {Object} identificationConfigObject 
     * @param {string} identificationConfigObject.source - the source feature branch
     * @param {string} identificationConfigObject.target - the target feature branch
     */
    identifyCreatedFiles({ source, target }) {
        return this.git.diff(`${target} ${source} --name-only --diff-filter=A`)
            .then(this.splitGitDiffTextOutput);
    }

    /**
     * Identify modified files
     * @param {Object} identificationConfigObject 
     * @param {string} identificationConfigObject.source - the source feature branch
     * @param {string} identificationConfigObject.target - the target feature branch
     */
    identifyDeletedFiles({ source, target }) {
        return this.git.diff(`${target} ${source} --name-only --diff-filter=D`)
            .then(this.splitGitDiffTextOutput);
    }

    /**
     * Identify modified files
     * @param {Object} identificationConfigObject - the config object
     * @param {string} identificationConfigObject.source - the source feature branch
     * @param {string} identificationConfigObject.target - the target feature branch
     */
    identifyModifiedFiles({ source, target }) {
        return this.git.diff(`${target} ${source} --name-only --diff-filter=M`)
            .then(this.splitGitDiffTextOutput);
    }

    /**
     * splits string by newline characters
     * @param {string} output 
     */
    splitGitDiffTextOutput(output) {
        const resultsToReturn = output.trim().split(/\r?\n)/);
        return resultsToReturn;
    }


}