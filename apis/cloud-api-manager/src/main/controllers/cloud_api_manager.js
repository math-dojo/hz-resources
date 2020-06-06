const fs = require('fs');
const promisify = require('util').promisify;
const fsReadPromisified = promisify(fs.readFile);

const { TykDashboardService } = require("../services/tyk_dashboard");
const logger = new (require('../logging/custom_logger'))("cloud-api-manager:controllers:cloud_api_manager");

class CloudApiManagerController {

    /**
     * Initialises a CloudApiManagerController
     * @param {Object} controllerConfig - The config for the controller
     * @param {string} controllerConfig.provider - The product that provides the cloud-api-manager
     * @param {string} controllerConfig.authorisation - The security token used to authorise interactions with the manager
     */
    constructor({
        provider,
        authorisation
    }) {
        if ((!authorisation) || authorisation.length < 1) {
            const errorMessage = `authorisation cannot be undefined, null or empty`;
            logger.error(errorMessage)
            throw new Error(errorMessage);
        }
        switch (provider) {
            case 'tyk':
                this.apiServiceProvider = new TykDashboardService(authorisation);
                break;
            default:
                const errorMessage = `the specified provider "${provider}" is not configured in this package`;
                logger.error(errorMessage)
                throw new Error(errorMessage);
        }
    }

    /**
     * This method executes the requested behaviour specified
     * by the params
     * @param {Object} executionConfig - The config for the behaviour to executre
     * @param {string} executionConfig.filePath - The filePath of the object to be managed
     * @param {string} executionConfig.operation - The operation to perform with the supplied object via filePath
     * @param {string} executionConfig.type - The type of object at the filePath
     */
    execute({
        filePath,
        operation,
        type,
    }) {
        const definitionObjectPromise = fsReadPromisified.readFile(filePath)
            .then(
                result => {
                    logger.info(`About to parse supplied file at: ${filePath}`);
                    const inputObject = JSON.parse(result.toString('utf-8'));
                    return inputObject;
                }
            )
            .catch(error => {
                logger.error(`Failure parsing the file at ${filePath} because of ${error.message}`);
                throw new Error(error);
            });
        switch (operation) {
            case 'create':
                return this.create(type, definitionObjectPromise);
            case 'update':
                return this.update(type, definitionObjectPromise);
            case 'delete':
                return this.delete(type, definitionObjectPromise);
            default:
                const errorMessage = `The specified operation, ${operation}, is not valid.`;
                logger.error(errorMessage);
                return Promise.reject(new Error(errorMessage));
        }
    }

    create(type, inputObjectPromise) {
        switch (type) {
            case 'api':
                return inputObjectPromise;
            case 'policy':
                return inputObjectPromise;
            default:
                const errorMessage = `The specified type, ${type}, is not valid.`;
                logger.error(errorMessage);
                return Promise.reject(new Error(errorMessage));
        }
    }

    update(type, inputObjectPromise) {
        switch (type) {
            case 'api':
                return inputObjectPromise;
            case 'policy':
                return inputObjectPromise;
            default:
                const errorMessage = `The specified type, ${type}, is not valid.`;
                logger.error(errorMessage);
                return Promise.reject(new Error(errorMessage));
        }
    }

    delete(type, inputObjectPromise) {
        switch (type) {
            case 'api':
                return inputObjectPromise;
            case 'policy':
                return inputObjectPromise;
            default:
                const errorMessage = `The specified type, ${type}, is not valid.`;
                logger.error(errorMessage);
                return Promise.reject(new Error(errorMessage));
        }
    }

    findAssetIdentifier(type, assetObject) {
        switch (type) {
            case 'api':
                const desiredName = assetObject.api_definition.name;
                return this.apiServiceProvider.findApiByName(desiredName)
                    .then(searchResults => {
                        if (searchResults.apis.length < 1) {
                            throw Error(`the asset with name ${desiredName} does not exist in the provider`);
                        }
                        logger.info(`${searchResults.apis.length} search result(s) for asset name: ${desiredName}`);
                        const matchingResults = searchResults.apis.filter(eachApi =>
                            desiredName === eachApi.api_definition.name);
                        return matchingResults[0].api_definition.id;
                    })
                    .catch(error => {
                        logger.error(`.findAssetIdentifier failed because: ${error.message}`);
                        return Promise.reject(error);
                    });
            case 'policy':
                const desiredPolicyName = assetObject.name;
                return this.apiServiceProvider.findPolicyByName(desiredPolicyName)
                .then(searchResults => {
                    if (searchResults.Data.length < 1) {
                        throw Error(`the asset with name ${desiredPolicyName} does not exist in the provider`);
                    }
                    logger.info(`${searchResults.Data.length} search result(s) for asset name: ${desiredPolicyName}`);
                    const matchingResults = searchResults.Data.filter(eachPolicy =>
                        desiredPolicyName === eachPolicy.name);
                    return matchingResults[0]._id;
                })
                .catch(error => {
                    logger.error(`.findAssetIdentifier failed because: ${error.message}`);
                    return Promise.reject(error);
                });
            default:
                const errorMessage = `The specified type, ${type}, is not valid.`;
                logger.error(errorMessage);
                return Promise.reject(new Error(errorMessage));
        }
    }
}

module.exports.CloudApiManagerController = CloudApiManagerController;
