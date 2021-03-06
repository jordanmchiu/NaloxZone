import Pharmacy from "./util/Pharmacy";
import PharmData from "./util/PharmData";
// import * as Papa from "papaparse";
// import * as fs from "fs";

export default class PharmacyManager {
    private static instance: PharmacyManager;
    private readonly pharmacies: Pharmacy[];
    // public static PHARMACY_JSON_DATA_FILEPATH: string = "./source-data/pharmacy-data-papaparse.json";
    // public PHARMACY_CSV_DATA_FILEPATH: string = "./source-data/vancouver-pharmacies.csv";

    /**
     * NOTE: This constructor should only be used for internal testing.  The modules fs and papaparse
     * cannot be accessed from the browser.  This constructor would work if a Server was set up, but
     * that can be done at a later date.
     */
    /*
    private constructor() {
        this.pharmacies = [];
        if (!fs.existsSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH)) {
            const csvString = fs.readFileSync(this.PHARMACY_CSV_DATA_FILEPATH, "utf8");
            const parsedPharmacyJSONnew = Papa.parse(csvString, {
                delimiter: ",",
                header: true
            });
            fs.writeFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, JSON.stringify(parsedPharmacyJSONnew), "utf8");
            this.makePharmaciesFromJSON(parsedPharmacyJSONnew.data);
        } else {
            const parsedPharmacyJSON = JSON.parse(fs.readFileSync(PharmacyManager.PHARMACY_JSON_DATA_FILEPATH, "utf8"));
            this.pharmacies = parsedPharmacyJSON.data;
        }
    }
    */

    /**
     * This constructor imports pharmacy data from ./util/PharmData
     */
    private constructor() {
        this.pharmacies = [];
        this.makePharmaciesFromJSON(PharmData.VAN_PHARM);
    }

    /**
     * Builds a list of Pharmacies given a Papaparsed csv data array from
     * a properly formatted raw csv data file.
     * @param pharmacyArray
     */
    private makePharmaciesFromJSON(pharmacyArray) {
        for (let basicPharmObject of pharmacyArray) {
            let training: boolean;
            if (basicPharmObject.Training === "TRUE") {
                training = true;
            } else if (basicPharmObject.Training === "FALSE") {
                training = false;
            } else {
                throw new Error("CSV improperly formatted: Training is not 'TRUE' or 'FALSE'");
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