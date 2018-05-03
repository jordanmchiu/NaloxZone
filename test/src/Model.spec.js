"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHandler_1 = require("../../src/LocationHandler");
var PharmacyManager_1 = require("../../src/PharmacyManager");
var Location_1 = require("../../src/util/Location");
var fs = require("fs");
require("../../node_modules/mocha");
var chai_1 = require("chai");
describe("Basic util tests", function () {
    before(function () {
        console.log("Before: " + this.test.parent.title);
        if (fs.existsSync(PharmacyManager_1.default.PHARMACY_JSON_DATA_FILEPATH)) {
            fs.unlinkSync(PharmacyManager_1.default.PHARMACY_JSON_DATA_FILEPATH);
        }
    });
    beforeEach(function () {
        console.log("BeforeTest: " + this.currentTest.title);
    });
    after(function () {
        console.log("After: " + this.test.parent.title);
    });
    afterEach(function () {
        console.log("AfterTest: " + this.currentTest.title);
    });
    it("LocationHandler should be instantiated with default location", function () {
        var defaultLoc = new Location_1.default(49.2827, -123.1207, "Vancouver BC");
        chai_1.expect(LocationHandler_1.default.getInstance().getCurrLoc().address).to.equal(defaultLoc.address);
        chai_1.expect(LocationHandler_1.default.getInstance().getCurrLoc().lat).to.equal(defaultLoc.lat);
        chai_1.expect(LocationHandler_1.default.getInstance().getCurrLoc().lon).to.equal(defaultLoc.lon);
    });
    it("Should construct PharmacyManager with 51 pharmacies in Vancouver", function () {
        chai_1.expect(PharmacyManager_1.default.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager_1.default.getInstance().getPharmacies()[1]));
    });
    it("Should get list of 51 pharmacies from file", function () {
        chai_1.expect(PharmacyManager_1.default.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager_1.default.getInstance().getPharmacies()[1]));
    });
});
