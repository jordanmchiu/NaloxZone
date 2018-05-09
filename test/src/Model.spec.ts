import LocationHandler from "../../src/LocationHandler";
import PharmacyManager from "../../src/PharmacyManager";
import Location from "../../src/util/Location";
import * as fs from "fs";
import "../../node_modules/mocha";
import { expect } from "chai";

describe("Model unit/integration tests", () => {
    const UBCShoppers: Location = new Location(49.266023, -123.245835, "Vancouver BC");
    const calgary: Location = new Location(51.0486, -114.0708, "Calgary, AB");
    const burnaby: Location = new Location(49.2488, -122.9805, "Burnaby, BC");
    const richmond: Location = new Location(49.166592, -123.133568	, "Richmond, BC");

    before(function () {
        console.log(`Before: ${this.test.parent.title}`);
        /*
        if (fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            fs.unlinkSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH);
        }
        */
    });

    beforeEach(function () {
        console.log(`BeforeTest: ${this.currentTest.title}`);
    });

    after(function () {
        console.log(`After: ${this.test.parent.title}`);
    });

    afterEach(function () {
        console.log(`AfterTest: ${this.currentTest.title}`);
    });

    it("LocationHandler should be instantiated with default location", () => {
        let defaultLoc: Location = new Location(49.2827, -123.1207, "Vancouver BC");
        expect(LocationHandler.getInstance().getCurrLoc().getAddress()).to.equal(defaultLoc.getAddress());
        expect(LocationHandler.getInstance().getCurrLoc().getLat()).to.equal(defaultLoc.getLat());
        expect(LocationHandler.getInstance().getCurrLoc().getLon()).to.equal(defaultLoc.getLon());
    });

    it("Should construct PharmacyManager with 51 pharmacies in Vancouver", () => {
        expect(PharmacyManager.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager.getInstance().getPharmacies()[0]));
    });

    it("Should get list of 51 pharmacies from file", () => {
        expect(PharmacyManager.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager.getInstance().getPharmacies()[0]));
    });

    it("Should sort pharmacies closest to default location (Downtown Vancouver)", () => {
        const sortedPharmaciesDT = LocationHandler.getInstance().sortByClosest(LocationHandler.DEFAULT_LOCATION);
        expect(sortedPharmaciesDT.length).to.equal(51);
        console.log("Closest pharmacy: " + JSON.stringify(sortedPharmaciesDT[0]));
        console.log("Furthest pharmacy: " + JSON.stringify(sortedPharmaciesDT[50]));
    });

    it("Should sort pharmacies closest to UBC Shoppers Drug Mart", () => {
        const sortedPharmaciesUBC = LocationHandler.getInstance().sortByClosest(UBCShoppers);
        expect(sortedPharmaciesUBC.length).to.equal(51);
        console.log("Closest pharmacy: " + JSON.stringify(sortedPharmaciesUBC[0]));
        console.log("Furthest pharmacy: " + JSON.stringify(sortedPharmaciesUBC[50]));
    });

    it("Should remove all pharmacies that are more than 10km away from Calgary", () => {
        const sortedPharmaciesCalgary = LocationHandler.getInstance().sortByClosest(calgary);
        expect(sortedPharmaciesCalgary.length).to.equal(51);
        const closePharmaciesCalgary = LocationHandler.getInstance().removeFarPharmacies(calgary, sortedPharmaciesCalgary);
        expect(closePharmaciesCalgary.length).to.equal(0);
    });

    it("Should remove all pharmacies that are more than 10km away from Burnaby", () => {
        const sortedPharmaciesBurnaby = LocationHandler.getInstance().sortByClosest(burnaby);
        expect(sortedPharmaciesBurnaby.length).to.equal(51);
        const closePharmaciesBurnaby = LocationHandler.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        expect(closePharmaciesBurnaby.length).to.equal(21);
    });

    it("Should return list of (at most) 5 pharmacies that provide overdose training", () => {
        const sortedPharmaciesBurnaby = LocationHandler.getInstance().sortByClosest(burnaby);
        expect(sortedPharmaciesBurnaby.length).to.equal(51);
        const closePharmaciesBurnaby = LocationHandler.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        expect(closePharmaciesBurnaby.length).to.equal(21);
        const filteredPharmaciesBurnaby = LocationHandler.getInstance().filterPharmacies(closePharmaciesBurnaby, true);
        expect(filteredPharmaciesBurnaby.length).to.equal(5);
        console.log("=====Pharmacies with overdose training close to Burnaby=====");
        for (let i = 0; i < filteredPharmaciesBurnaby.length; i++) {
            console.log(JSON.stringify(filteredPharmaciesBurnaby[i]));
        }
    });

    it("Should return list of (at most) 5 pharmacies that may or may not provide overdose training", () => {
        const sortedPharmaciesBurnaby = LocationHandler.getInstance().sortByClosest(burnaby);
        expect(sortedPharmaciesBurnaby.length).to.equal(51);
        const closePharmaciesBurnaby = LocationHandler.getInstance().removeFarPharmacies(burnaby, sortedPharmaciesBurnaby);
        expect(closePharmaciesBurnaby.length).to.equal(21);
        const filteredPharmaciesBurnaby = LocationHandler.getInstance().filterPharmacies(closePharmaciesBurnaby, false);
        expect(filteredPharmaciesBurnaby.length).to.equal(5);
        console.log("=====Pharmacies close to Burnaby=====");
        for (let i = 0; i < filteredPharmaciesBurnaby.length; i++) {
            console.log(JSON.stringify(filteredPharmaciesBurnaby[i]));
        }
    });

    it("Should return list of at most 5 pharmacies that provide overdose training near UBC", () => {
        LocationHandler.getInstance().setCurrLoc(UBCShoppers);
        const ubcPharmaciesWithTraining = LocationHandler.getInstance().getNearest(true);
        expect(ubcPharmaciesWithTraining.length).to.equal(5);
        console.log("=====Pharmacies close to UBC with training=====");
        for (let i = 0; i < ubcPharmaciesWithTraining.length; i++) {
            console.log(JSON.stringify(ubcPharmaciesWithTraining[i]));
        }
    });

    it("Should return list of at most 5 pharmacies that need not provide overdose training near Richmond", () => {
        LocationHandler.getInstance().setCurrLoc(richmond);
        const rmdPharmacies = LocationHandler.getInstance().getNearest(false);
        expect(rmdPharmacies.length).to.equal(5);
        console.log("=====Pharmacies close to Richmond=====");
        for (let i = 0; i < rmdPharmacies.length; i++) {
            console.log(JSON.stringify(rmdPharmacies[i]));
        }
    });

    it("Should return list of 0 pharmacies close to Calgary", () => {
        LocationHandler.getInstance().setCurrLoc(calgary);
        const cgyPharmacies = LocationHandler.getInstance().getNearest(false);
        expect(cgyPharmacies.length).to.equal(0);
    });
});