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
                return globalHeader.clickPatients();
            } else {
                return false;
            }
        }).then(async () => {
            // enter the patient ID into the search page and click Search
            let patientSearch = await ElementFactory.make(PatientSearch, null);
            return patientSearch.isPresent().then(async (itIsPresent) => {
                // console.log("      itIsPresent = " + itIsPresent);
                if (itIsPresent) {
                    return patientSearch.enterPatientId(patientID).then(async() => {
                        return patientSearch.clickSearchButton();
                    });
                    // wait until the page has loaded
                } else {
                    throw "ERROR - didn't get to patient search";
                }
            }).then(async ()=> {
                return patientSearch.searchResults.selectFirstResult();
            });
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

