const logger = new (require("./logging"))("index");
// jshint esversion:6
const { describe, it } = require("mocha");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Index: End-to-End Tests", function () {
    it("should do some stuff");
});
