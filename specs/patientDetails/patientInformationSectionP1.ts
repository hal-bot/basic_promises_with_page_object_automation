/**
 *  Description: This will test P1 tests for the Patient Information section of the Patient Details page header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-49
 *  Example: https://qc.sttx40.com/#/patient/65858
 */

import {PatientInformation} from "../../objects/pages/patientDetails/patientInformation";
import {NavigationMethods} from "../../utils/navigationUtilities";
import {browser} from "protractor";


describe('The patient\'s information details', () => {

    let infoSection: PatientInformation;

    function validateExtendedPropertyPresenceToBe(expectation: boolean) {
        console.log("  In 'validateExtendedPropertyPresenceToBe';  value = " + expectation);

        // these take a few second to run a piece if the 'expectation' is false.  If too many are checked a timeout error will be thrown.
        // Splitting it out to ensure a few things are checked if we expect it to be closed and all if we expect it to be open
        expect<any>(browser.isElementPresent(infoSection.gender.title)).toBe(expectation);
        // if (expectation === true) {
        //     expect<any>(browser.isElementPresent(infoSection.status.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.weight.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.ssn.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.ethnicity.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.prefix.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.suffix.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.enterpriseId.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.mothersPid.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.numberOfPregnancies.title)).toBe(expectation);
        //     expect<any>(browser.isElementPresent(infoSection.converted.title)).toBe(expectation);
        // }
        expect<any>(browser.isElementPresent(infoSection.mergedToId.title)).toBe(expectation);
    }

    beforeAll( () => {
        NavigationMethods.navigateToAPatientPage().then(function() {
            infoSection = new PatientInformation();
        });
    });

    // afterAll( () => {
    //     console.log("SLEEPING!");
    //     browser.sleep(10000);
    // });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/41 **/
    it('should be present, be collapsed on load, display default fields', () => {
        expect<any>(infoSection.isPresent()).toBe(true);
        expect<any>(infoSection.title.getText()).toBe('Patient Information');
        expect<any>(infoSection.isExpanded()).toBe(false);
        expect<any>(infoSection.mrn.isPresent()).toBe(true);
        expect<any>(infoSection.patientID.isPresent()).toBe(true);
        expect<any>(infoSection.lastName.isPresent()).toBe(true);
        expect<any>(infoSection.firstName.isPresent()).toBe(true);
        expect<any>(infoSection.middleName.isPresent()).toBe(true);
        expect<any>(infoSection.dateOfBirth.isPresent()).toBe(true);

        validateExtendedPropertyPresenceToBe(false);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/55 **/
    fit('should be able to expand to show more details', () => {
        console.log("In the second IT method");
        infoSection.expand().then(function () {
            console.log("EXPANDED");
            expect<any>(infoSection.arrowButton.label.getText()).toBe('Less Details');
            expect<any>(infoSection.isExpanded()).toBe(true);
            validateExtendedPropertyPresenceToBe(true);
        }).then(function () {
           infoSection.contract().then(function () {
               expect<any>(infoSection.arrowButton.label.getText()).toBe('More Details');
               expect<any>(infoSection.isExpanded()).toBe(false);
               validateExtendedPropertyPresenceToBe(false);
           });
        });
    });

});
