// jshint esversion:6
"use-strict";
const { describe, it } = require("mocha");
const sinon = require('sinon');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { tykApiSearchResponseData, tykApiResponseData } = require("../resources/sample_api_payload");
const { tykFindPolicyByNameResponseData } = require("../resources/sample_policy_payloads");

Object.freeze(tykFindPolicyByNameResponseData);
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
        it("apis: should return an id if the provider search returns one possibility", function () {
            const nameToSearchFor = tykApiSearchResponseData.apis[0].api_definition.name;
            const expectedSystemId = tykApiSearchResponseData.apis[0].api_definition.id;

            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findApiByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findApiByName");
            findApiByNameProviderStub.returns(Promise.resolve(tykApiSearchResponseData));

            const systemIdPromise = testController.findAssetIdentifier('api', { api_definition: { name: nameToSearchFor } });
            return expect(systemIdPromise).to.eventually.equal(expectedSystemId);
        });
        it("apis: should return an id if the provider search returns multiple possibilities", function () {
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
            return expect(systemIdPromise).to.eventually.equal(expectedSystemId);

        });
        it("apis: should return a rejected promise nothing was found", function () {
            const nameToSearchFor = tykApiSearchResponseData.apis[0].api_definition.name;

            const returnedResults = {apis: []};
            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findApiByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findApiByName");
            findApiByNameProviderStub.returns(Promise.resolve(returnedResults));

            const systemIdPromise = testController.findAssetIdentifier('api', { api_definition: { name: nameToSearchFor } });
            return expect(systemIdPromise).to.eventually.be.rejectedWith(/the asset with name (.*) does not exist/);
        });
        it("policies: should return an id if the provider search returns one possibility", function() {
            const nameToSearchFor = tykFindPolicyByNameResponseData.Data[0].name;
            const expectedSystemId = tykFindPolicyByNameResponseData.Data[0]._id;

            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findPolicyByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findPolicyByName");
            findPolicyByNameProviderStub.returns(Promise.resolve(tykFindPolicyByNameResponseData));

            const systemIdPromise = testController.findAssetIdentifier('policy', { name: nameToSearchFor });
            return expect(systemIdPromise).to.eventually.equal(expectedSystemId);
        });
        it("policies: should return an id if the provider search returns multiple possibilities", function() {
            const nameToSearchFor = tykFindPolicyByNameResponseData.Data[0].name;
            const expectedSystemId = tykFindPolicyByNameResponseData.Data[0]._id;
            const multipleResults = {
                Data: [
                    JSON.parse(JSON.stringify(tykFindPolicyByNameResponseData.Data[0])),
                    JSON.parse(JSON.stringify(tykFindPolicyByNameResponseData.Data[0]))
                ]
            };
            multipleResults.Data[1].name = multipleResults.Data[1].name + " a small change";
            multipleResults.Data[1]._id = "a_different_id";

            const testController = new CloudApiManagerController({ provider: 'tyk', authorisation: 'fizzbuzz' });
            const findPolicyByNameProviderStub = sinon.stub(testController.apiServiceProvider, "findPolicyByName");
            findPolicyByNameProviderStub.returns(Promise.resolve(multipleResults));

            const systemIdPromise = testController.findAssetIdentifier('policy', { name: nameToSearchFor });
            return expect(systemIdPromise).to.eventually.equal(expectedSystemId);
        });
        it("policies: should return a rejected promise nothing was found");
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

