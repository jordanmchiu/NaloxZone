"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(lat, lon, address) {
        this.lat = lat;
        this.lon = lon;
        if (address) {
            this.address = address;
        }
    }
    return Location;
}());
exports.default = Location;
