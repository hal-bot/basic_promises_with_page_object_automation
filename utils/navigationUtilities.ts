/** This file will be used to store misc. methods used for navigation */

import {browser, $, protractor} from "protractor";
import Global = NodeJS.Global;
import {Dashboard} from "../objects/pages/dashboard";
import {PatientSearch} from "../objects/pages/patientSearch";
import {ElementFactory} from "./elementUtilities";
import {GlobalHeader} from "../objects/pages/global/header";

export class NavigationMethods {

    static async navigateToAPatientPage(patientID: string = "65858"): Promise<void|false> {
        console.log("In 'NavigationMethods.navigateToAPatientPage';  patientID = " + patientID);

        // return browser.get('/#/patient/' + patientID).then(()=> {
        //     // console.log("  Waiting for Patient Information to load");
        //
        //     // TODO: this 'isElelementPresent' takes awhile.  Figure out a way to speed it up!
        //     // return $('div.patient-information-mrn').isPresent();
        //     return browser.wait(()=> {
        //         return browser.isElementPresent($('div.patient-information-mrn'));
        //     }, 30000);
        // });

        let globalHeader = await ElementFactory.make(GlobalHeader, null);
        return globalHeader.isPresent().then(async (itIsPresent) => {
            console.log("      HERE A - itIsPresent = " + itIsPresent);
            if (itIsPresent) {
                console.log("      HERE B");
                return globalHeader.clickPatients();
            } else {
                console.log("      HERE C");
                return false;
            }
        }).then(async ()=> {
            console.log("      HERE D");
            let patientSearch = await ElementFactory.make(PatientSearch, null);
            return patientSearch.isPresent().then(async (itIsPresent) => {
                console.log("      HERE E - itIsPresent = " + itIsPresent);
                if (itIsPresent) {
                    console.log("      HERE F");
                    return patientSearch.searchInfoSection.patientID.input(patientID).then(()=> {
                        console.log("      HERE G");
                        return patientSearch.searchInfoSection.searchButton.click();
                    });
                // wait until the page has loaded
                } else {
                    console.log("      HERE H");
                    return false;
                }
            });
        });


        // return globalHeader.clickPatients().then(async ()=> {
        //     let patientSearch = await ElementFactory.make(PatientSearch, null);
        //     return patientSearch.searchInfoSection.patientID.input(patientID).then(()=> {
        //         return patientSearch.searchInfoSection.searchButton.click();
        //     });
        //     // wait until the page has loaded
        // });
    }

}

