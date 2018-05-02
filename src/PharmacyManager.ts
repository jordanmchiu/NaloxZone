import Pharmacy from "./util/Pharmacy";
import * as Papa from "papaparse";
import * as fs from "fs";

export default class PharmacyManager {
    private static instance: PharmacyManager;
    private pharmacies: Pharmacy[];
    public PHARMACY_JSON_DATA_FILEPATH: string = "./source-data/pharmacy-data.json";
    public PHARMACY_CSV_DATA_FILEPATH: string = "./source-data/vancouver-pharmacies.csv";

    private constructor() {
        if (!fs.existsSync(this.PHARMACY_JSON_DATA_FILEPATH)) {
            const csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            const pharmacyJSON = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            this.makePharmaciesFromJSON(pharmacyJSON);
            fs.writeFileSync(this.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(this.pharmacies), "utf8");
        } else {
            this.pharmacies = JSON.parse(fs.readFileSync(this.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
        }
    }

    private makePharmaciesFromJSON(pharmacyJSON) {
        for (let basicPharmObject of pharmacyJSON) {
            const p: Pharmacy = new Pharmacy(basicPharmObject.Name,
                basicPharmObject.Address,
                basicPharmObject.Training,
                basicPharmObject.Latitude,
                basicPharmObject.Longitude);
            this.pharmacies.push(p);
        }
    }

    public static getInstance(): PharmacyManager {
        if (this.instance === undefined) {
            this.instance = new PharmacyManager();
        }
        return this.instance;
    }

    public getPharmacies(): Pharmacy[] {
        return this.pharmacies;
    }
}