// jshint esversion:6
const { describe, it } = require("mocha");
const nock = require('nock');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const { tykApiResponseData } = require("../resources/sample_payload");
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
});
