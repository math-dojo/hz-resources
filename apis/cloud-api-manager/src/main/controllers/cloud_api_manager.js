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
        if((!authorisation) || authorisation.length < 1) {
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
}

module.exports.CloudApiManagerController = CloudApiManagerController;
