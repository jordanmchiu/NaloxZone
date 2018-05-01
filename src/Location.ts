export default class Location {
    address: string;
    lat: number;
    lon: number;

    constructor(lat: number, lon: number, address?: string) {
        this.lat = lat;
        this.lon = lon;
        if (address) { this.address = address; }
    }
}