import Location from "./Location";

export default class Pharmacy {
    name: string;
    location: Location;
    training: boolean;

    constructor (name: string, address: string, training: boolean, lat: number, lon: number) {
        this.name = name;
        this.training = training;
        this.location = new Location(lat, lon, address);
    }
}