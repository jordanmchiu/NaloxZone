import Pharmacy from "./Pharmacy";

export default class PharmacyManager {
    private static instance: PharmacyManager;
    private pharmacies: Pharmacy[];

    private constructor() {
        // stub
        this.pharmacies = [];
    }

    public static getInstance(): PharmacyManager {
        if (this === undefined) {
            this.instance = new PharmacyManager();
        }
        return this.instance;
    }
}