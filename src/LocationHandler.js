"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PharmacyManager_1 = require("./PharmacyManager");
var maps_1 = require("@google/maps");
var GoogleMapsAPIKey_1 = require("./GoogleMapsAPIKey");
var LocationHandler = /** @class */ (function () {
    function LocationHandler() {
        // public static DEFAULT_LOCATION = new Location(49.2827, -123.1207, "Vancouver BC");
        this.PHARMACIES_TO_RETURN = 5;
        this.MAX_DISTANCE = 10; // maximum km from pharmacy to be considered
        this.geoCoder = maps_1.GoogleMapsClient;
        this.geoCoder = maps_1.createClient({
            key: GoogleMapsAPIKey_1.default.API_KEY,
        });
        this.currLoc = undefined;
    }
    // TODO: Handle exceptional cases
    LocationHandler.getInstance = function () {
        if (this.instance === undefined) {
            this.instance = new LocationHandler();
        }
        return this.instance;
    };
    /**
     * Given LocationHandler's current location, returns a list of a maximum of PHARMACIES_TO_RETURN
     * pharmacies sorted by increasing distance from current location within 10 km.  If trainingNeeded,
     * only returns pharmacies that provide overdose training.  Otherwise, returns all pharmacies.
     * @param {boolean} trainingNeeded      Specifies whether only pharmacies providing overdose
     *                                      training should be returned
     * @returns {Pharmacy[]}                List of maximum of PHARMACIES_TO_RETURN pharmacies sorted
     *                                      by increasing distance from this.curLoc
     */
    LocationHandler.prototype.getNearest = function (trainingNeeded) {
        if (this.currLoc === undefined) {
            return PharmacyManager_1.default.getInstance().getPharmacies();
        }
        else {
            var sortedPharms = this.sortByClosest(this.currLoc);
            var closePharms = this.removeFarPharmacies(this.currLoc, sortedPharms);
            return this.filterPharmacies(closePharms, trainingNeeded);
        }
    };
    LocationHandler.prototype.setCurrLoc = function (loc) {
        if (loc !== null && loc !== undefined) {
            this.currLoc = loc;
        }
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
     * ordered from first to last by distance from current location.
     *
     * Currently uses selection sort since there are few pharmacies.  Can use more efficient
     * algorithm later.
     * @param {Location} l      Given location
     * @returns {Pharmacy[]}    A list of pharmacies in PharmacyManager sorted from
     *                          first to last by distance from given location
     */
    LocationHandler.prototype.sortByClosest = function (l) {
        if (PharmacyManager_1.default.getInstance().getPharmacies().length === 0) {
            return [];
        }
        var workingList = PharmacyManager_1.default.getInstance().getPharmacies();
        for (var i = 0; i < workingList.length; i++) {
            var smallest = i;
            for (var j = i + 1; j < workingList.length; j++) {
                if (this.distanceToPharmacy(l, workingList[j]) < this.distanceToPharmacy(l, workingList[smallest])) {
                    smallest = j;
                }
            }
            var temp = workingList[i];
            workingList[i] = workingList[smallest];
            workingList[smallest] = temp;
        }
        return workingList;
    };
    /**
     * Given a list of pharmacies, remove pharmacies that are more than MAX_DISTANCE km
     * away from given location.
     * @param {Location} l          Given location
     * @param {Pharmacy[]} pList    Given list of pharmacies to remove
     * @returns {Pharmacy[]}
     */
    LocationHandler.prototype.removeFarPharmacies = function (l, pList) {
        var closePharmacies = [];
        for (var i = 0; i < pList.length; i++) {
            if (this.distanceToPharmacy(l, pList[i]) <= this.MAX_DISTANCE * 1000) {
                closePharmacies.push(pList[i]);
            }
        }
        return closePharmacies;
    };
    /**
     * Given a sorted list of pharmacies, returns a maximum of PHARMACIES_TO_RETURN from that list.
     * If trainingNeeded, only include pharmacies that provide overdose training.  Otherwise include
     * pharmacies that don't provide overdose training.
     * @param {Pharmacy[]} pList
     * @param {boolean} trainingNeeded
     * @returns {Pharmacy[]}
     */
    LocationHandler.prototype.filterPharmacies = function (pList, trainingNeeded) {
        var filteredPharmacies = [];
        var i = 0;
        for (var idx = 0; idx < pList.length; idx++) {
            if (trainingNeeded) {
                if (pList[idx].getTraining()) {
                    filteredPharmacies.push(pList[idx]);
                    i++;
                }
            }
            else {
                filteredPharmacies.push(pList[idx]);
                i++;
            }
            if (i >= this.PHARMACIES_TO_RETURN) {
                break;
            }
        }
        return filteredPharmacies;
    };
    /**
     * Get Location from given address as string
     * @param address
     */
    LocationHandler.prototype.geocodeLocation = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lat, lon;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // stub
                    })];
            });
        });
    };
    LocationHandler.RADIUS = 6371000; // radius of earth in metres
    return LocationHandler;
}());
exports.default = LocationHandler;
