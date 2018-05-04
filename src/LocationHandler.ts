import Pharmacy from "./util/Pharmacy";
import Location from "./util/Location";
import PharmacyManager from "./PharmacyManager";

export default class LocationHandler {
    private static instance: LocationHandler;
    private static RADIUS: number = 6371000;   // radius of earth in metres
    public static DEFAULT_LOCATION = new Location(49.2827, -123.1207, "Vancouver BC");
    private PHARMACIES_TO_RETURN: number = 5;
    private MAX_DISTANCE: number = 10;   // maximum km from pharmacy to be considered
    private currLoc: Location;

    private constructor() {
        this.currLoc = LocationHandler.DEFAULT_LOCATION;
    }

    // TODO: Handle exceptional cases

    public static getInstance(): LocationHandler {
        if (this.instance === undefined) {
            this.instance = new LocationHandler();
        }
        return this.instance;
    }

    /**
     * Given LocationHandler's current location, returns a list of a maximum of PHARMACIES_TO_RETURN
     * pharmacies sorted by increasing distance from current location within 10 km.  If trainingNeeded,
     * only returns pharmacies that provide overdose training.  Otherwise, returns all pharmacies.
     * @param {boolean} trainingNeeded      Specifies whether only pharmacies providing overdose
     *                                      training should be returned
     * @returns {Pharmacy[]}                List of maximum of PHARMACIES_TO_RETURN pharmacies sorted
     *                                      by increasing distance from this.curLoc
     */
    public getNearest(trainingNeeded: boolean): Pharmacy[] {
        const sortedPharms: Pharmacy[] = this.sortByClosest(this.currLoc);
        const closePharms: Pharmacy[] = this.removeFarPharmacies(this.currLoc, sortedPharms);
        return this.filterPharmacies(closePharms, trainingNeeded);
    }

    public setCurrLoc(loc: Location) {
        if (loc != null && loc != undefined) { this.currLoc = loc; }
    }

    public getCurrLoc(): Location {
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
     * ordered from first to last by distance from current location.
     *
     * Currently uses selection sort since there are few pharmacies.  Can use more efficient
     * algorithm later.
     * @param {Location} l      Given location
     * @returns {Pharmacy[]}    A list of pharmacies in PharmacyManager sorted from
     *                          first to last by distance from given location
     */
    public sortByClosest(l: Location): Pharmacy[] {
        if (PharmacyManager.getInstance().getPharmacies().length === 0) {
            return [];
        }
        let workingList: Pharmacy[] = PharmacyManager.getInstance().getPharmacies();
        for (let i = 0; i < workingList.length; i++) {
            let smallest = i;
            for (let j: number = i + 1; j < workingList.length; j++) {
                if (this.distanceToPharmacy(l, workingList[j]) < this.distanceToPharmacy(l, workingList[smallest])) {
                    smallest = j;
                }
            }
            let temp: Pharmacy = workingList[i];
            workingList[i] = workingList[smallest];
            workingList[smallest] = temp;
        }
        return workingList;
    }

    /**
     * Given a list of pharmacies, remove pharmacies that are more than MAX_DISTANCE km
     * away from given location.
     * @param {Location} l          Given location
     * @param {Pharmacy[]} pList    Given list of pharmacies to remove
     * @returns {Pharmacy[]}
     */
    public removeFarPharmacies(l: Location, pList: Pharmacy[]): Pharmacy[] {
        let closePharmacies: Pharmacy[] = [];
        for (let i = 0; i < pList.length; i++) {
            if (this.distanceToPharmacy(l, pList[i]) <= this.MAX_DISTANCE * 1000) {
                closePharmacies.push(pList[i]);
            }
        }
        return closePharmacies;
    }

    /**
     * Given a sorted list of pharmacies, returns a maximum of PHARMACIES_TO_RETURN from that list.
     * If trainingNeeded, only include pharmacies that provide overdose training.  Otherwise include
     * pharmacies that don't provide overdose training.
     * @param {Pharmacy[]} pList
     * @param {boolean} trainingNeeded
     * @returns {Pharmacy[]}
     */
    public filterPharmacies(pList: Pharmacy[], trainingNeeded: boolean): Pharmacy[] {
        let filteredPharmacies: Pharmacy[] = [];
        let i: number = 0;
        for (let idx = 0; idx < pList.length; idx++) {
            if (trainingNeeded) {
                if (pList[idx].getTraining()) {
                    filteredPharmacies.push(pList[idx]);
                    i++;
                }
            } else {
                filteredPharmacies.push(pList[idx]);
                i++;
            }
            if (i >= this.PHARMACIES_TO_RETURN) { break; }
        }
        return filteredPharmacies;
    }
}