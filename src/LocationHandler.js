"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./util/Location");
var LocationHandler = /** @class */ (function () {
    function LocationHandler() {
        this.PHARMACIES_TO_RETURN = 5;
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
    return LocationHandler;
}());
exports.default = LocationHandler;
