/**
 *  Description: This will test P1 tests for the Patient Details header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { browser } from 'protractor';
import { PatientPageHeader } from "../../objects/pages/patientDetails/header";
import { GlobalHeader } from "../../objects/pages/global/header";


describe('The global footer from a P1 level', () => {

    let patientHeader: PatientPageHeader;
    let globalHeader: GlobalHeader;

    beforeEach( () => {
        browser.get('/');
        patientHeader = new PatientPageHeader();
        globalHeader = new GlobalHeader();

        globalHeader.patients.click();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/53 **/
    it('should be present', () => {
        expect(patientHeader.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/53 **/
    it('should be below the global header', () => {
        globalHeader.patients.link.getLocation().then(function( globalHeaderLocation ) {
            patientHeader.container.getLocation().then(function( patientHeaderLocation ) {
                expect(globalHeaderLocation.y).toBeLessThan(patientHeaderLocation.y)
            });
        });
    });

});
