// jshint esversion:6
const axios = require('axios').default;
const querystring = require('querystring');

class TykDashboardService {

    /**
     * Creates an instance of the TykDashboardService
     * @param {string} authorization 
     * @param {string} baseUrl 
     */
    constructor(authorization, baseUrl) {
        this._httpClientInstance = axios.create({
            baseURL: baseUrl,
            timeout: 1000,
            headers: { 'authorization': authorization },
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            }
        });

        this._httpClientInstance.interceptors.request.use(function (config) {
            console.info(`Now sending request to: ${config.baseURL}${config.url}`);
            return config;
        }, function (error) {
            console.error(`Error sending request: ${error.message}`);
            return Promise.reject(error);
        });

        // Add a response interceptor
        this._httpClientInstance.interceptors.response.use(function (response) {
            console.info(`Successful response from ${
                response.request.path}, now extracting the json response for downstream consumers`);
            return response.data;
        }, function (error) {
            console.error(`Unsuccessful response from ${error.request.path}`);
            console.error(`Request config was: ${error.config}`);
            return Promise.reject(error);
        });
    }

    /**
     * 
     * @param {string} name 
     */
    findApiByName(name) {
        const encodeNameParam = querystring.stringify(name);
        return this._httpClientInstance.get(`/api/apis/search?q=${encodeNameParam}`);
    }

    /**
     * 
     * @param {string} systemId 
     */
    findApiBySystemId(systemId) {
        return this._httpClientInstance.get(`/api/apis/${systemId}`);
    }

    /**
     * 
     * @param {string} systemId 
     */
    deleteApiBySystemId(systemId) {
        return this._httpClientInstance.delete(`/api/apis/${systemId}`);
    }

    /**
     * 
     * @param {object} apiDefinition 
     */
    createApi(apiDefinition) {
        return this._httpClientInstance.post(`/api/apis`, apiDefinition);
    }

    /**
     * 
     * @param {string} systemId 
     * @param {object} apiDefinition 
     */
    updateApiBySystemId(systemId, apiDefinition) {
        return this._httpClientInstance.put(`/api/apis/${systemId}`, apiDefinition);
    }

}

module.exports.TykDashboardService = TykDashboardService;
