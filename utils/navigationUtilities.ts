/** This file will be used to store misc. methods used for navigation */

import {browser, $, protractor} from "protractor";
import Global = NodeJS.Global;
import {Dashboard} from "../objects/pages/dashboard";
import {PatientSearch} from "../objects/pages/patientSearch";
import {ElementFactory} from "./elementUtilities";
import {GlobalHeader} from "../objects/pages/global/header";
import {async} from "q";

export class NavigationMethods {

    // This way of navigating to a patient page will do it more like a real user - through Patient Search
    static async navigateToAPatientPageLikeAUser(patientID: string = "65858"): Promise<void | false> {
        console.log("In 'NavigationMethods.navigateToAPatientPageLikeAUser';  patientID = " + patientID);

        let globalHeader = await ElementFactory.make(GlobalHeader, null);
        return globalHeader.isPresent().then(async (itIsPresent) => {
            // get to the search page
            if (itIsPresent) {
                console.log("      HERE B");
                return globalHeader.clickPatients();
            } else {
                return false;
            }
        }).then(async () => {
            // enter the patient ID into the search page and click Search
            console.log("      HERE C");
            let patientSearch = await ElementFactory.make(PatientSearch, null);
            console.log("      HERE D");
            return patientSearch.isPresent().then(async (itIsPresent) => {
                console.log("      HERE E - itIsPresent = " + itIsPresent);
                if (itIsPresent) {
                    console.log("      HERE F");
                    // return patientSearch.searchInfoSection.patientID.input(patientID).then(async() => {
                    return patientSearch.enterPatientId(patientID).then(async() => {
                        console.log("      HERE G");
                        return patientSearch.clickSearchButton();
                    });
                    // wait until the page has loaded
                } else {
                    console.log("      HERE H");
                    throw "ERROR - didn't get to patient search";
                }
            });
        }).then(async ()=> {
            console.log("      HERE I");
            // click the first result's 'Select' button
            return $('td.patientSearch-results-row-selectButton a').click();
        });
    }

    // This way of navigating to a patient page will do it quickly - through the browser address bar
    // Users won't be using the site like this
    static async navigateToAPatientPageQuickly(patientID: string = "65858"): Promise<void | false> {
        console.log("In 'NavigationMethods.navigateToAPatientPageQuickly';  patientID = " + patientID);

        return browser.get('/#/patient/' + patientID).then(() => {
            // console.log("  Waiting for Patient Information to load");

            // TODO: this 'isElelementPresent' takes awhile.  Figure out a way to speed it up!
            // return $('div.patient-information-mrn').isPresent();
            return browser.wait(() => {
                return browser.isElementPresent($('div.patient-information-mrn'));
            }, 30000);
        });
    }
}

