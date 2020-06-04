// jshint esversion:6
const { describe, it } = require("mocha");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { CloudApiManagerController } = require("../../main/controllers/cloud_api_manager");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("CloudApiManagerController", function() {
    describe("Initialisation", function() {
        it("should return a new CloudApiManagerController if successful", function() {
            const returnedController = new CloudApiManagerController({provider: 'tyk', authorisation: 'fizzbuzz'});
            expect(returnedController).to.be.a(CloudApiManagerController);
        });
        it("should throw an error if authorisation is null or empty");
        it("should throw an error if the request provider is null or empty");
        it("should throw an error if the request provider is unknown");
    });
    describe(".create", function() {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });
    describe(".update", function() {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });
    describe(".delete", function() {
        it("should return if successful");
        it("should throw an error if unsuccessful");
    });    
});

