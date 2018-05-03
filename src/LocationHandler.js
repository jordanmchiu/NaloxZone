"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./util/Location");
var LocationHandler = /** @class */ (function () {
    function LocationHandler() {
        this.PHARMACIES_TO_RETURN = 5;
        this.MAX_DISTANCE = 10; // maximum km from pharmacy to be considered
        this.DEFAULT_LOCATION = new Location_1.default(49.2827, -123.1207, "Vancouver BC");
        this.currLoc = this.DEFAULT_LOCATION;
        // stub
    }
    LocationHandler.getInstance = function () {
        if (this.instance === undefined) {
            this.instance = new LocationHandler();
        }
        return this.instance;
    };
    LocationHandler.prototype.getNearest = function (loc) {
        return []; // stub
    };
    LocationHandler.prototype.setCurrLoc = function (loc) {
        // stub
    };
    LocationHandler.prototype.getCurrLoc = function () {
        return this.currLoc;
    };
    /**
     * Find distance in meters from a given location to a given pharmacy
     * Implementation from CPSC210 (Paul Carter)
     * @param {Pharmacy} l     Specified location
     * @param {Pharmacy} p     Specified pharmacy
     * @returns {number}       Distance in meters
     */
    LocationHandler.prototype.distanceToPharmacy = function (l, p) {
        var lat1 = l.getLat() / 180.0 * Math.PI;
        var lat2 = p.getLocation().getLat() / 180.0 * Math.PI;
        var deltaLon = (p.getLocation().getLon() - l.getLon()) / 180.0 * Math.PI;
        var deltaLat = (p.getLocation().getLat() - l.getLat()) / 180.0 * Math.PI;
        var a = Math.sin(deltaLat / 2.0) * Math.sin(deltaLat / 2.0)
            + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(deltaLon / 2.0) * Math.sin(deltaLon / 2.0);
        var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return c * LocationHandler.RADIUS;
    };
    /**
     * Given a current location, returns a list of pharmacies in PharmacyManager
     * ordered from first to last by distance from current location within MAX_DISTANCE km.
     *
     * Currently uses selection sort since there are few pharmacies.  Can use more efficient
     * algorithm later.
     * @param {Location} l      Given location
     * @returns {Pharmacy[]}    A list of pharmacies in PharmacyManager sorted from
     *                          first to last by distance from given location
     */
    LocationHandler.prototype.sortByClosest = function (l) {
        return []; // stub;
    };
    LocationHandler.RADIUS = 6371000; // radius of earth in metres
    return LocationHandler;
}());
exports.default = LocationHandler;
