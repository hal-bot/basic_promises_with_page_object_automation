/** This file will be used to store misc. methods used for navigation */

import {browser} from "protractor";

export class NavigationMethods {

    static navigateToAPatientPage(patientID: number = 65858): Promise<{}> {
        return new Promise(()=> {
            console.log("In 'NavigationMethods.navigateToAPatientPage';  patientID = " + patientID);
            return browser.get('/#/patient/' + patientID);
        });
    }

}