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
            expect(returnedController).to.be.instanceOf(CloudApiManagerController);
        });
        it("should throw an error if authorisation is null or empty", function() {
            expect(() => new CloudApiManagerController({provider: 'tyk', authorisation: ''})).to.throw(
                `authorisation cannot be undefined, null or empty`
            );
            expect(() => new CloudApiManagerController({provider: 'tyk'})).to.throw(
                `authorisation cannot be undefined, null or empty`
            );
        });
        it("should throw an error if the request provider is null or empty", function() {
            expect(() => new CloudApiManagerController({authorisation: 'fizz'})).to.throw(
                `the specified provider "undefined" is not configured in this package`
            );
            expect(() => new CloudApiManagerController({provider: '', authorisation: 'fizz'})).to.throw(
                `the specified provider "" is not configured in this package`
            );            
        });
        it("should throw an error if the request provider is unknown", function() {
            const provider = 'kong';
            expect(() => new CloudApiManagerController({provider: provider, authorisation: 'fizz'})).to.throw(
                `the specified provider "${provider}" is not configured in this package`
            );
        });
    });
        });
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

