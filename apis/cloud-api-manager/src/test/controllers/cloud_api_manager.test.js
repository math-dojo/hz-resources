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
            expect(() => new CloudApiManagerController({provider: 'tyk', authorisation: ''})).to.throw();
            expect(() => new CloudApiManagerController({provider: 'tyk'})).to.throw();
        });
        it("should throw an error if the request provider is null or empty", function() {
            expect(() => new CloudApiManagerController({authorisation: 'fizz'})).to.throw();
            expect(() => new CloudApiManagerController({provider: '', authorisation: 'fizz'})).to.throw();            
        });
        it("should throw an error if the request provider is unknown", function() {
            expect(() => new CloudApiManagerController({provider: 'kong', authorisation: 'fizz'})).to.throw();
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

