"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pharmacy_1 = require("./util/Pharmacy");
var Papa = require("papaparse");
var fs = require("fs");
var PharmacyManager = /** @class */ (function () {
    function PharmacyManager() {
        this.PHARMACY_CSV_DATA_FILEPATH = "./source-data/vancouver-pharmacies.csv";
        this.pharmacies = [];
        if (!fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            var csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            var parsedPharmacyJSON = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            fs.writeFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(parsedPharmacyJSON), "utf8");
            this.makePharmaciesFromJSON(parsedPharmacyJSON.data);
        }
        else {
            var parsedPharmacyJSON = JSON.parse(fs.readFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
            this.pharmacies = parsedPharmacyJSON.data;
        }
    }
    PharmacyManager.prototype.makePharmaciesFromJSON = function (pharmacyArray) {
        for (var _i = 0, pharmacyArray_1 = pharmacyArray; _i < pharmacyArray_1.length; _i++) {
            var basicPharmObject = pharmacyArray_1[_i];
            var training = void 0;
            if (basicPharmObject.Training === "TRUE") {
                training = true;
            }
            else {
                training = false;
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
    PharmacyManager.PHARMACY_JSON_DATA_FILEPATH = "./source-data/pharmacy-data-papaparse.json";
    return PharmacyManager;
}());
exports.default = PharmacyManager;
