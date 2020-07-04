const debug = require('debug');

class CustomLogger {
    constructor(namespace, isForTestCode = false) {
        const packageName = "cloud-api-onboarding-executor";
        const prefix = isForTestCode ? `${packageName}-test` : packageName
        this._namespace = namespace;
        this._errorDebugLogger = debug(`${prefix}:${namespace}:error`);
        const info_log = debug(`${prefix}:${namespace}:info`);
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
