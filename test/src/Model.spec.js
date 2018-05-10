"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHandler_1 = require("../../src/LocationHandler");
var PharmacyManager_1 = require("../../src/PharmacyManager");
var Location_1 = require("../../src/util/Location");
require("../../node_modules/mocha");
var chai_1 = require("chai");
describe("Model unit/integration tests", function () {
    var UBCShoppers = new Location_1.default(49.266023, -123.245835, "Vancouver BC");
    var calgary = new Location_1.default(51.0486, -114.0708, "Calgary, AB");
    var burnaby = new Location_1.default(49.2488, -122.9805, "Burnaby, BC");
    var richmond = new Location_1.default(49.166592, -123.133568, "Richmond, BC");
    before(function () {
        console.log("Before: " + this.test.parent.title);
        /*
        if (fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            fs.unlinkSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH);
        }
        */
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
    it("LocationHandler - currLoc should be undefined", function () {
        chai_1.expect(LocationHandler_1.default.getInstance().getCurrLoc()).to.equal(undefined);
    });
    it("Should construct PharmacyManager with 51 pharmacies in Vancouver", function () {
        chai_1.expect(PharmacyManager_1.default.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager_1.default.getInstance().getPharmacies()[0]));
    });
    it("Should get list of 51 pharmacies from file", function () {
        chai_1.expect(PharmacyManager_1.default.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager_1.default.getInstance().getPharmacies()[0]));
    });
    it("Should sort pharmacies closest to default location (Downtown Vancouver)", function () {
        var sortedPharmaciesDT = LocationHandler_1.default.getInstance().sortByClosest(new Location_1.default(49.2827, -123.1207, "Vancouver BC"));
        chai_1.expect(sortedPharmaciesDT.length).to.equal(51);
        console.log("Closest pharmacy: " + JSON.stringify(sortedPharmaciesDT[0]));
        console.log("Furthest pharmacy: " + JSON.stringify(sortedPharmaciesDT[50]));
    });
    it("Should sort pharmacies closest to UBC Shoppers Drug Mart", function () {
        var sortedPharmaciesUBC = LocationHandler_1.default.getInstance().sortByClosest(UBCShoppers);
        chai_1.expect(sortedPharmaciesUBC.length).to.equal(51);
        console.log("Closest pharmacy: " + JSON.stringify(sortedPharmaciesUBC[0]));
        console.log("Furthest pharmacy: " + JSON.stringify(sortedPharmaciesUBC[50]));
    });
    it("Should remove all pharmacies that are more than 10km away from Calgary", function () {
        var sortedPharmaciesCalgary = LocationHandler_1.default.getInstance().sortByClosest(calgary);
        chai_1.expect(sortedPharmaciesCalgary.length).to.equal(51);
        var closePharmaciesCalgary = LocationHandler_1.default.getInstance().removeFarPharmacies(calgary, sortedPharmaciesCalgary);
        chai_1.expect(closePharmaciesCalgary.length).to.equal(0);
    });
    it("Should remove all pharmacies that are more than 10km away from Burnaby", function () {
        var sortedPharmaciesBurnaby = LocationHandler_1.default.getInstance().sortByClosest(burnaby);
        chai_1.expect(sortedPharmaciesBurnaby.length).to.equal(51);
        var closePharmaciesBurnaby = LocationHandler_1.default.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        chai_1.expect(closePharmaciesBurnaby.length).to.equal(21);
    });
    it("Should return list of (at most) 5 pharmacies that provide overdose training", function () {
        var sortedPharmaciesBurnaby = LocationHandler_1.default.getInstance().sortByClosest(burnaby);
        chai_1.expect(sortedPharmaciesBurnaby.length).to.equal(51);
        var closePharmaciesBurnaby = LocationHandler_1.default.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        chai_1.expect(closePharmaciesBurnaby.length).to.equal(21);
        var filteredPharmaciesBurnaby = LocationHandler_1.default.getInstance().filterPharmacies(closePharmaciesBurnaby, true);
        chai_1.expect(filteredPharmaciesBurnaby.length).to.equal(5);
        console.log("=====Pharmacies with overdose training close to Burnaby=====");
        for (var i = 0; i < filteredPharmaciesBurnaby.length; i++) {
            console.log(JSON.stringify(filteredPharmaciesBurnaby[i]));
        }
    });
    it("Should return list of (at most) 5 pharmacies that may or may not provide overdose training", function () {
        var sortedPharmaciesBurnaby = LocationHandler_1.default.getInstance().sortByClosest(burnaby);
        chai_1.expect(sortedPharmaciesBurnaby.length).to.equal(51);
        var closePharmaciesBurnaby = LocationHandler_1.default.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        chai_1.expect(closePharmaciesBurnaby.length).to.equal(21);
        var filteredPharmaciesBurnaby = LocationHandler_1.default.getInstance().filterPharmacies(closePharmaciesBurnaby, false);
        chai_1.expect(filteredPharmaciesBurnaby.length).to.equal(5);
        console.log("=====Pharmacies close to Burnaby=====");
        for (var i = 0; i < filteredPharmaciesBurnaby.length; i++) {
            console.log(JSON.stringify(filteredPharmaciesBurnaby[i]));
        }
    });
    it("Should return list of at most 5 pharmacies that provide overdose training near UBC", function () {
        LocationHandler_1.default.getInstance().setCurrLoc(UBCShoppers);
        var ubcPharmaciesWithTraining = LocationHandler_1.default.getInstance().getNearest(true);
        chai_1.expect(ubcPharmaciesWithTraining.length).to.equal(5);
        console.log("=====Pharmacies close to UBC with training=====");
        for (var i = 0; i < ubcPharmaciesWithTraining.length; i++) {
            console.log(JSON.stringify(ubcPharmaciesWithTraining[i]));
        }
    });
    it("Should return list of at most 5 pharmacies that need not provide overdose training near Richmond", function () {
        LocationHandler_1.default.getInstance().setCurrLoc(richmond);
        var rmdPharmacies = LocationHandler_1.default.getInstance().getNearest(false);
        chai_1.expect(rmdPharmacies.length).to.equal(5);
        console.log("=====Pharmacies close to Richmond=====");
        for (var i = 0; i < rmdPharmacies.length; i++) {
            console.log(JSON.stringify(rmdPharmacies[i]));
        }
    });
    it("Should return list of 0 pharmacies close to Calgary", function () {
        LocationHandler_1.default.getInstance().setCurrLoc(calgary);
        var cgyPharmacies = LocationHandler_1.default.getInstance().getNearest(false);
        chai_1.expect(cgyPharmacies.length).to.equal(0);
    });
});
