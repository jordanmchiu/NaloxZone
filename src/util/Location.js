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
    Location.prototype.getLat = function () { return this.lat; };
    Location.prototype.getLon = function () { return this.lon; };
    Location.prototype.getAddress = function () { return this.address; };
    return Location;
}());
exports.default = Location;
