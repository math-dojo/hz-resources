// jshint esversion:6
const { describe, it } = require("mocha");
const nock = require('nock');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const { tykApiResponseData, tykDeleteApiResponse, tykUpdateApiResponseData,
    tykCreateApiResponseData, tykCreateApiRequestObject, tykUpdateApiRequestObject
 } = require("../resources/sample_payload");

const { TykDashboardService } =  require("../../main/services/tyk_dashboard.service");

const AUTHORISATION_HEADER_NAME = 'authorization';

describe("TykDashboardService", function() {
    const baseUrl = 'https://admin.cloud.tyk.io';
    const authorisationToken = 'hush';
    const tykDashboardService = new TykDashboardService(authorisationToken, baseUrl);

    it('successful .findApiByName should return apiDataResponse{}', function() {
        const mockDataResponse = {
                apis: [
                    tykApiResponseData
                ]
            };
        const scope = nock(baseUrl).get("/api/apis/search")
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .query({q: 'myApiName'})
            .reply(200, mockDataResponse,
            {
                "Content-Type": "application/json"
            });
        const apiDataResponse = tykDashboardService.findApiByName('myApiName');
        return Promise.all([
            expect(apiDataResponse).to.eventually.deep.equal(mockDataResponse)
        ]);
        
    });
    it('unsuccessful .findApiByName should return null', function() {
        const apiNameToSearchFor = 'myApiName';
        const scope = nock(baseUrl).get("/api/apis/search")
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .query({q: apiNameToSearchFor})
            .reply(400, "some generic error");
        const apiDataResponse = tykDashboardService.findApiByName('myApiName');
        return Promise.all([
            expect(apiDataResponse).to.eventually.be.null
        ]);
        
    });

    it('successful .findApiBySystemId should return apiDataResponse{}', function() {
        const mockDataResponse = tykApiResponseData;
        const scope = nock(baseUrl).get(/\/api\/apis\/([A-z]?[0-9]?)+$/)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(200, mockDataResponse,
            {
                "Content-Type": "application/json"
            });
        const apiDataResponse = tykDashboardService.findApiBySystemId('myApiId');
        return Promise.all([
            expect(apiDataResponse).to.eventually.deep.equal(mockDataResponse)
        ]);
        
    });
    it('unsuccessful .findApiBySystemId should return null', function() {
        const scope = nock(baseUrl).get(/\/api\/apis\/([A-z]?[0-9]?)+$/)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(400, "some generic error");
        const apiDataResponse = tykDashboardService.findApiBySystemId('myUnknownApiId');
        return Promise.all([
            expect(apiDataResponse).to.eventually.be.null
        ]);
        
    });

    it('successful .deleteApiBySystemId should return deleteResponse with OK status', function() {
        const mockDataResponse = tykDeleteApiResponse;
        const scope = nock(baseUrl).delete(/\/api\/apis\/([A-z]?[0-9]?)+$/)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(204, mockDataResponse,
            {
                "Content-Type": "application/json"
            });
        const apiDeleteResponse = tykDashboardService.deleteApiBySystemId('myApiId');
        return Promise.all([
            expect(apiDeleteResponse).to.eventually.have.property("status").equal("ok")
        ]);
        
    });
    it('unsuccessful .deleteApiBySystemId should return null', function() {
        const scope = nock(baseUrl).delete(/\/api\/apis\/([A-z]?[0-9]?)+$/)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(400, "some generic error");
        const apiDataResponse = tykDashboardService.deleteApiBySystemId('myUnknownApiId');
        return Promise.all([
            expect(apiDataResponse).to.eventually.be.null
        ]);
        
    });
    it('successful .updateApiBySystemId should return updateResponse with OK status', function() {
        const mockDataResponse = tykUpdateApiResponseData;
        const scope = nock(baseUrl).put(/\/api\/apis\/([A-z]?[0-9]?)+$/, tykUpdateApiRequestObject)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(204, mockDataResponse,
            {
                "Content-Type": "application/json"
            });
        const apiDeleteResponse = tykDashboardService.updateApiBySystemId('myApiId', tykUpdateApiRequestObject);
        return Promise.all([
            expect(apiDeleteResponse).to.eventually.have.property("status").equal("ok")
        ]);
        
    });
    it('unsuccessful .updateApiBySystemId should return null', function() {
        const scope = nock(baseUrl).put(/\/api\/apis\/([A-z]?[0-9]?)+$/, tykUpdateApiRequestObject)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(400, "some generic error");
        const apiDataResponse = tykDashboardService.updateApiBySystemId('myUnknownApiId', tykUpdateApiRequestObject);
        return Promise.all([
            expect(apiDataResponse).to.eventually.be.null
        ]);
        
    });

    it('successful .createApi should return updateResponse with OK status', function() {
        const mockDataResponse = tykCreateApiResponseData;
        const scope = nock(baseUrl).post(/\/api\/apis$/, tykCreateApiRequestObject)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(201, mockDataResponse,
            {
                "Content-Type": "application/json"
            });
        const apiDeleteResponse = tykDashboardService.createApi(tykCreateApiRequestObject);
        return Promise.all([
            expect(apiDeleteResponse).to.eventually.have.property("status").equal("ok")
        ]);
        
    });
    it('unsuccessful .createApi should return null', function() {
        const scope = nock(baseUrl).put(/\/api\/apis$/, tykCreateApiRequestObject)
            .matchHeader(AUTHORISATION_HEADER_NAME, authorisationToken)
            .reply(400, "some generic error");
        const apiDataResponse = tykDashboardService.createApi(tykCreateApiRequestObject);
        return Promise.all([
            expect(apiDataResponse).to.eventually.be.null
        ]);
        
    });
});
