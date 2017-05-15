/** This file will be used to store misc. methods used for navigation */

import {browser, $, protractor} from "protractor";
import {promise, WebDriver} from "selenium-webdriver";
import Global = NodeJS.Global;

export class NavigationMethods {

    static navigateToAPatientPage(patientID: number = 65858): promise.Promise<any> {
        // console.log("In 'NavigationMethods.navigateToAPatientPage';  patientID = " + patientID);
        return browser.get('/#/patient/' + patientID).then(()=> {
            // console.log("  Waiting for Patient Information to load");

            //TODO: this 'isElelementPresent' takes awhile.  Figure out a way to speed it up!
            // return $('div.patient-information-mrn').isPresent();
            return browser.wait(()=> {
                return browser.isElementPresent($('div.patient-information-mrn'));
            }, 30000);
        });
    }

}

