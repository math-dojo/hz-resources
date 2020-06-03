const fs = require('fs');
const promisify = require('util').promisify;
const fsReadPromisified = promisify(fs.readFile);

const { TykDashboardService } = require("../services/tyk_dashboard");
const logger = new (require('../logging/custom_logger'))("cloud-api-manager:controllers:cloud_api_manager");

class CloudApiManagerController {

    constructor({
        filePath,
        operation,
        type,
        provider,
        authorisation        
    }) {
        this.filePath = filePath;
        this.operation = operation;
        this.type = type;
        
        switch(provider) {
            case 'tyk':
                this.apiServiceProvider = new TykDashboardService(authorisation)
            default:
                const errorMessage = `the specified provider ${provider} is not configured in this package`;
                logger.error(errorMessage)
                throw new Error(errorMessage);
        }
    }

    execute() {
        return fsReadPromisified.readFile(this.filePath).then(
            result => {
                const inputObject = JSON.parse(result.toString('utf-8'));
            }
        )
        .catch(error => {
            logger.error(error);
            throw new Error(error);
        })
    }

    create(inputObject) {
        
    }

    update(inputObject) {
        
    }

    delete(inputObject) {
        
    }
}