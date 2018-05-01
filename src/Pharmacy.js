"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pharmacy = /** @class */ (function () {
    function Pharmacy(name, address, training) {
        this.name = name;
        this.training = training;
        // given the location of the pharmacy as a string, geocode the location
        // using Google Maps API to LatLon, then assign the given LatLon to
        // the Pharmacy to be constructed.
    }
    return Pharmacy;
}());
exports.default = Pharmacy;
