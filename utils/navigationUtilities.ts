/** This file will be used to store misc. methods used for navigation */

import {GlobalHeader} from "../objects/pages/global/header";
import {browser} from "protractor";

export class NavigationMethods {

    globalHeader: GlobalHeader;

    constructor() {
        this.globalHeader = new GlobalHeader();
    }

    navigateToAPatientPage(patientID: number | null) {
        if (patientID === null) {
            patientID = 65858;
        }
        browser.get('/#/patient/' + patientID);

    }

}