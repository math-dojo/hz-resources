const debug = require('debug');

class CustomLogger {
    constructor(namespace) {
        this._namespace = namespace;
        this._errorDebugLogger = debug(`cloud-api-onboarding-executor:${namespace}:error`);
        const info_log = debug(`cloud-api-onboarding-executor:${namespace}:info`);
        /**
         * set info logs to go via stdout as debug
         * binds to stderr by default
         *  */
        info_log.log = console.log.bind(console);
        this._infoDebugLogger = info_log;
    }

    info(message) {
        this._infoDebugLogger(message);
    }

    error(message) {
        this._errorDebugLogger(message);
    }
}

module.exports = CustomLogger;
