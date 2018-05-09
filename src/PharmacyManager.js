"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pharmacy_1 = require("./util/Pharmacy");
var PharmData_1 = require("./util/PharmData");
// import * as Papa from "papaparse";
// import * as fs from "fs";
var PharmacyManager = /** @class */ (function () {
    // public static PHARMACY_JSON_DATA_FILEPATH: string = "./source-data/pharmacy-data-papaparse.json";
    // public PHARMACY_CSV_DATA_FILEPATH: string = "./source-data/vancouver-pharmacies.csv";
    /**
     * NOTE: This constructor should only be used for internal testing.  The modules fs and papaparse
     * cannot be accessed from the browser.  This constructor would work if a Server was set up, but
     * that can be done at a later date.
     */
    /*
    private constructor() {
        this.pharmacies = [];
        if (!fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            const csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            const parsedPharmacyJSONnew = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            fs.writeFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(parsedPharmacyJSONnew), "utf8");
            this.makePharmaciesFromJSON(parsedPharmacyJSONnew.data);
        } else {
            const parsedPharmacyJSON = JSON.parse(fs.readFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
            this.pharmacies = parsedPharmacyJSON.data;
        }
    }
    */
    /**
     * This constructor imports pharmacy data from ./util/PharmData
     */
    function PharmacyManager() {
        this.pharmacies = [];
        this.makePharmaciesFromJSON(PharmData_1.default.VAN_PHARM);
    }
    /**
     * Builds a list of Pharmacies given a Papaparsed csv data array from
     * a properly formatted raw csv data file.
     * @param pharmacyArray
     */
    PharmacyManager.prototype.makePharmaciesFromJSON = function (pharmacyArray) {
        for (var _i = 0, pharmacyArray_1 = pharmacyArray; _i < pharmacyArray_1.length; _i++) {
            var basicPharmObject = pharmacyArray_1[_i];
            var training = void 0;
            if (basicPharmObject.Training === "TRUE") {
                training = true;
            }
            else if (basicPharmObject.Training === "FALSE") {
                training = false;
            }
            else {
                throw new Error("CSV improperly formatted: Training is not 'TRUE' or 'FALSE'");
            }
            var lat = Number(basicPharmObject.Latitude);
            var lon = Number(basicPharmObject.Longitude);
            var p = new Pharmacy_1.default(basicPharmObject.Name, basicPharmObject.Address, training, lat, lon);
            this.pharmacies.push(p);
        }
    };
    PharmacyManager.getInstance = function () {
        if (this.instance === undefined) {
            this.instance = new PharmacyManager();
        }
        return this.instance;
    };
    PharmacyManager.prototype.getPharmacies = function () {
        return this.pharmacies;
    };
    return PharmacyManager;
}());
exports.default = PharmacyManager;
