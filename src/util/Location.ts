export default class Location {
    private address: string;
    private lat: number;
    private lon: number;

    constructor(lat: number, lon: number, address?: string) {
        this.lat = lat;
        this.lon = lon;
        if (address) { this.address = address; }
    }

    public getLat() { return this.lat; }
    public getLon() { return this.lon; }
    public getAddress() { return this.address; }
}