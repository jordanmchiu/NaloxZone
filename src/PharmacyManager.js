"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PharmacyManager = /** @class */ (function () {
    function PharmacyManager() {
        // stub
        this.pharmacies = [];
    }
    PharmacyManager.getInstance = function () {
        if (this === undefined) {
            this.instance = new PharmacyManager();
        }
        return this.instance;
    };
    return PharmacyManager;
}());
exports.default = PharmacyManager;
