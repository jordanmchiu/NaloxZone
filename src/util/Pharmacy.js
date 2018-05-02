"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var Pharmacy = /** @class */ (function () {
    function Pharmacy(name, address, training, lat, lon) {
        this.name = name;
        this.training = training;
        this.location = new Location_1.default(lat, lon, address);
    }
    return Pharmacy;
}());
exports.default = Pharmacy;
