const logger = new (require("./logging"))("executor", true);
// jshint esversion:6
const { describe, it } = require("mocha");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Executor Tests", function () {
    it("should do some stuff");
});
