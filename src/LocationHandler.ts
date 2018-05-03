import Pharmacy from "./util/Pharmacy";
import Location from "./util/Location";

export default class LocationHandler {
    private static instance: LocationHandler;
    private static RADIUS: number = 6371000;   // radius of earth in metres
    private PHARMACIES_TO_RETURN: number = 5;
    private MAX_DISTANCE: number = 10;   // maximum km from pharmacy to be considered
    private DEFAULT_LOCATION = new Location(49.2827, -123.1207, "Vancouver BC");
    private currLoc: Location;

    private constructor() {
        this.currLoc = this.DEFAULT_LOCATION;
        // stub
    }

    public static getInstance(): LocationHandler {
        if (this.instance === undefined) {
            this.instance = new LocationHandler();
        }
        return this.instance;
    }

    getNearest(loc: Location): Pharmacy[] {
        return []; // stub
    }

    setCurrLoc(loc: Location) {
        // stub
    }

    getCurrLoc(): Location {
        return this.currLoc;
    }

    /**
     * Find distance in meters from a given location to a given pharmacy
     * Implementation from CPSC210 (Paul Carter)
     * @param {Pharmacy} l     Specified location
     * @param {Pharmacy} p     Specified pharmacy
     * @returns {number}       Distance in meters
     */
    public distanceToPharmacy(l: Location, p: Pharmacy): number {
        const lat1: number = l.getLat() / 180.0 * Math.PI;
        const lat2: number = p.getLocation().getLat() / 180.0 * Math.PI;
        const deltaLon = (p.getLocation().getLon() - l.getLon()) / 180.0 * Math.PI;
        const deltaLat = (p.getLocation().getLat() - l.getLat()) / 180.0 * Math.PI;

        const a: number = Math.sin(deltaLat / 2.0) * Math.sin(deltaLat / 2.0)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.sin(deltaLon / 2.0) * Math.sin(deltaLon / 2.0);
        const c: number = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return c * LocationHandler.RADIUS;
    }

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
    public sortByClosest(l: Location): Pharmacy[] {
        return [] // stub;
    }
}