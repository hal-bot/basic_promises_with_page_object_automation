/**
 *  Description: This will test P1 tests for the Patient Information section of the Patient Details page header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-49
 *  Example: https://qc.sttx40.com/#/patient/65858
 */

import {PatientInformation} from "../../objects/pages/patientDetails/patientInformation";
import {NavigationMethods} from "../../utils/navigationUtilities";


xdescribe('The global footer from a P1 level', () => {

    let infoSection: PatientInformation;

    function validateExtendedPropertyPresenceToBe(value: boolean) {
        expect(infoSection.gender.isPresent()).toBe(value);
        expect(infoSection.status.isPresent()).toBe(value);
        expect(infoSection.weight.isPresent()).toBe(value);
        expect(infoSection.ssn.isPresent()).toBe(value);
        expect(infoSection.ethnicity.isPresent()).toBe(value);
        expect(infoSection.prefix.isPresent()).toBe(value);
        expect(infoSection.suffix.isPresent()).toBe(value);
        expect(infoSection.enterpriseId.isPresent()).toBe(value);
        expect(infoSection.mothersPid.isPresent()).toBe(value);
        expect(infoSection.numberOfPregnancies.isPresent()).toBe(value);
        expect(infoSection.converted.isPresent()).toBe(value);
        expect(infoSection.mergedToId.isPresent()).toBe(value);
    }

    beforeAll( () => {
        NavigationMethods.navigateToAPatientPage(65858);
        infoSection = new PatientInformation();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/41 **/
    it('should be present, be collapsed on load, display default fields', () => {
        expect(infoSection.isPresent()).toBe(true);
        expect(infoSection.title.getText()).toBe('Patient Information');
        expect(infoSection.isExpanded()).toBe(false);

        expect(infoSection.mrn.isPresent()).toBe(true);
        expect(infoSection.patientID.isPresent()).toBe(true);
        expect(infoSection.lastName.isPresent()).toBe(true);
        expect(infoSection.firstName.isPresent()).toBe(true);
        expect(infoSection.middleName.isPresent()).toBe(true);
        expect(infoSection.dateOfBirth.isPresent()).toBe(true);

        validateExtendedPropertyPresenceToBe(false);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/55 **/
    it('should be able to expand to show more details', () => {
        infoSection.expand().then(function () {
            expect(infoSection.arrowButton.label.getText()).toBe('Less Details');
            expect(infoSection.isExpanded()).toBe(true);
            validateExtendedPropertyPresenceToBe(true);
        }).then(function () {
           infoSection.contract().then(function () {
               expect(infoSection.arrowButton.label.getText()).toBe('More Details');
               expect(infoSection.isExpanded()).toBe(false);
               validateExtendedPropertyPresenceToBe(false);
           });
        });
    });

});
