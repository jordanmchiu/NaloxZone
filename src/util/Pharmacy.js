"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var Pharmacy = /** @class */ (function () {
    function Pharmacy(name, address, training, lat, lon) {
        this.name = name;
        this.training = training;
        this.location = new Location_1.default(lat, lon, address);
    }
    Pharmacy.prototype.getLocation = function () { return this.location; };
    Pharmacy.prototype.getName = function () { return this.name; };
    Pharmacy.prototype.getTraining = function () { return this.training; };
    return Pharmacy;
}());
exports.default = Pharmacy;
