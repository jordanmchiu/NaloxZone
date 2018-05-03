import Location from "./Location";

export default class Pharmacy {
    private name: string;
    private location: Location;
    private training: boolean;

    constructor (name: string, address: string, training: boolean, lat: number, lon: number) {
        this.name = name;
        this.training = training;
        this.location = new Location(lat, lon, address);
    }

    public getLocation(): Location { return this.location; }
    public getName(): string { return this.name; }
    public getTraining(): boolean { return this.training; }
}