import Pharmacy from "./util/Pharmacy";
import Location from "./util/Location";

export default class LocationHandler {
    private static instance: LocationHandler;
    currLoc: Location;
    PHARMACIES_TO_RETURN: number = 5;
    DEFAULT_LOCATION = new Location(49.2827, -123.1207, "Vancouver BC");

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
}