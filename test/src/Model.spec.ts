import LocationHandler from "../../src/LocationHandler";
import PharmacyManager from "../../src/PharmacyManager";
import Location from "../../src/util/Location";
import * as fs from "fs";
import "../../node_modules/mocha";
import { expect } from "chai";

describe("Basic util tests", () => {
    before(function () {
        console.log(`Before: ${this.test.parent.title}`);
        if (fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            fs.unlinkSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH);
        }
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
        console.log(JSON.stringify(PharmacyManager.getInstance().getPharmacies()[1]));
    });

    it("Should get list of 51 pharmacies from file", () => {
        expect(PharmacyManager.getInstance().getPharmacies().length).to.equal(51);
        console.log(JSON.stringify(PharmacyManager.getInstance().getPharmacies()[1]));
    });
});