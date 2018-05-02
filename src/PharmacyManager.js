"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pharmacy_1 = require("./util/Pharmacy");
var Papa = require("papaparse");
var fs = require("fs");
var PharmacyManager = /** @class */ (function () {
    function PharmacyManager() {
        this.PHARMACY_JSON_DATA_FILEPATH = "./source-data/pharmacy-data.json";
        this.PHARMACY_CSV_DATA_FILEPATH = "./source-data/vancouver-pharmacies.csv";
        if (!fs.existsSync(this.PHARMACY_JSON_DATA_FILEPATH)) {
            var csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            var pharmacyJSON = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            this.makePharmaciesFromJSON(pharmacyJSON);
            fs.writeFileSync(this.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(this.pharmacies), "utf8");
        }
        else {
            this.pharmacies = JSON.parse(fs.readFileSync(this.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
        }
    }
    PharmacyManager.prototype.makePharmaciesFromJSON = function (pharmacyJSON) {
        for (var _i = 0, pharmacyJSON_1 = pharmacyJSON; _i < pharmacyJSON_1.length; _i++) {
            var basicPharmObject = pharmacyJSON_1[_i];
            var p = new Pharmacy_1.default(basicPharmObject.Name, basicPharmObject.Address, basicPharmObject.Training, basicPharmObject.Latitude, basicPharmObject.Longitude);
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
