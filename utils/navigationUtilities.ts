/** This file will be used to store misc. methods used for navigation */

import {browser, $} from "protractor";
import {promise} from "selenium-webdriver";

export class NavigationMethods {

    static navigateToAPatientPage(patientID: number = 65858): promise.Promise<any> {
        // console.log("In 'NavigationMethods.navigateToAPatientPage';  patientID = " + patientID);
        return browser.get('/#/patient/' + patientID).then(()=> {
            return browser.wait(()=> {
                console.log("Waiting!!");
                // $('div.wait-loader')
                return $('div.wait-loader').isPresent().then((present)=> {
                    console.log("  present? - " + present);
                    return !present;
                });
                // return browser.isElementPresent($('app-wait-loader')).then((present)=> {
                //     console.log("  present? - " + present);
                //     return !present;
                // });
            });
        });
    }

}