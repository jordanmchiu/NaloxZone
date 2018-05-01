import Location from "./Location";

export default class Pharmacy {
    name: string;
    location: Location;
    training: boolean;

    constructor (name: string, address: string, training: boolean) {
        this.name = name;
        this.training = training;
        // given the location of the pharmacy as a string, geocode the location
        // using Google Maps API to LatLon, then assign the given LatLon to
        // the Pharmacy to be constructed.
    }
}