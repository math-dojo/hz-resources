// jshint esversion:6
"use-strict";
const { describe, it } = require("mocha");
const sinon = require('sinon');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { tykApiSearchResponseData, tykApiResponseData } = require("../resources/sample_api_payload");
Object.freeze(tykApiResponseData);
Object.freeze(tykApiSearchResponseData);

const { CloudApiManagerController } = require("../../main/controllers/cloud_api_manager");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("CloudApiManagerController", function () {
    describe("Initialisation", function () {
        it("should return a new CloudApiManagerController if successful", function () {
            const returnedController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            expect(returnedController).to.be.instanceOf(CloudApiManagerController);
        });
        it("should throw an error if authorisation is null or empty", function () {
            expect(() => new CloudApiManagerController({ provider: 'tyk', authorisation: '' })).to.throw(
                `authorisation cannot be undefined, null or empty`
            );
            expect(() => new CloudApiManagerController({ provider: 'tyk' })).to.throw(
                `authorisation cannot be undefined, null or empty`
            );
        });
        it("should throw an error if the request provider is null or empty", function () {
            expect(() => new CloudApiManagerController({ authorisation: 'fizz' })).to.throw(
                `the specified provider "undefined" is not configured in this package`
            );
            expect(() => new CloudApiManagerController({ provider: '', authorisation: 'fizz' })).to.throw(
                `the specified provider "" is not configured in this package`
            );
        });
        it("should throw an error if the request provider is unknown", function () {
            const provider = 'kong';
            expect(() => new CloudApiManagerController({ provider: provider, authorisation: 'fizz' })).to.throw(
                `the specified provider "${provider}" is not configured in this package`
            );
        });
    });
    describe(".findAssetIdentifier", function () {
        it("should return an api with the exact matching name if the provider search returns one possibility", function () {
            const nameToSearchFor = tykApiSearchResponseData.apis[0].api_definition.name;
            const expectedSystemId = tykApiSearchResponseData.apis[0].api_definition.id;

            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findApiByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findApiByName");
            findApiByNameProviderStub.returns(Promise.resolve(tykApiSearchResponseData));

            const systemIdPromise = testController.findAssetIdentifier('api', { api_definition: { name: nameToSearchFor } });
            expect(systemIdPromise).to.eventually.equal(expectedSystemId);
        });
        it("should return an api with the exact matching name if the provider search returns multiple possibilities", function () {
            const nameToSearchFor = tykApiResponseData.api_definition.name;
            const expectedSystemId = tykApiResponseData.api_definition.id;
            const multipleResults = {
                apis: [
                    JSON.parse(JSON.stringify(tykApiResponseData)), 
                    JSON.parse(JSON.stringify(tykApiResponseData))
                ]
            };
            multipleResults.apis[1].api_definition.name = multipleResults.apis[1].api_definition.name + " a small change";
            multipleResults.apis[1].api_definition.id = "a_different_id";

            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findApiByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findApiByName");
            findApiByNameProviderStub.returns(Promise.resolve(multipleResults));

            const systemIdPromise = testController.findAssetIdentifier('api', { api_definition: { name: nameToSearchFor } });
            expect(systemIdPromise).to.eventually.equal(expectedSystemId);

        });
        it("should return a rejected promise if nothing was found");
    });
    describe(".create", function () {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });
    describe(".update", function () {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });
    describe(".delete", function () {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });
});

