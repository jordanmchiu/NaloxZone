import Pharmacy from "./util/Pharmacy";
import * as Papa from "papaparse";
import * as fs from "fs";

export default class PharmacyManager {
    private static instance: PharmacyManager;
    private pharmacies: Pharmacy[];
    public static PHARMACY_JSON_DATA_FILEPATH: string = "./source-data/pharmacy-data-papaparse.json";
    public PHARMACY_CSV_DATA_FILEPATH: string = "./source-data/vancouver-pharmacies.csv";

    private constructor() {
        this.pharmacies = [];
        if (!fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            const csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            const parsedPharmacyJSON = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            fs.writeFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(parsedPharmacyJSON), "utf8");
            this.makePharmaciesFromJSON(parsedPharmacyJSON.data);
        } else {
            const parsedPharmacyJSON = JSON.parse(fs.readFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
            this.pharmacies = parsedPharmacyJSON.data;
        }
    }

    private makePharmaciesFromJSON(pharmacyArray) {
        for (let basicPharmObject of pharmacyArray) {
            let training: boolean;
            if (basicPharmObject.Training === "TRUE") {
                training = true;
            } else {
                training = false;
            }

            const lat: number = Number(basicPharmObject.Latitude);
            const lon: number = Number(basicPharmObject.Longitude);
            const p: Pharmacy = new Pharmacy(basicPharmObject.Name, basicPharmObject.Address, training, lat, lon);
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