/**
 *  Description: This will test P1 tests for the contents of the Visit tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-55
 */

import { browser } from 'protractor';
import {VisitTab} from "../../../objects/pages/patientDetails/tabCollection/tabVisit";
import {GlobalHeader} from "../../../objects/pages/global/header";

xdescribe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;
    let globalHeader: GlobalHeader;

    beforeEach( () => {
        browser.get('/');
        globalHeader = new GlobalHeader();
        globalHeader.patients.click();

        visitTab = new VisitTab();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/62 **/
    it('should be present', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/42 **/
    it('should display the proper elements', () => {
        expect(visitTab.title.isPresent()).toBe(true);
        expect(visitTab.showDischargedVisits_checkbox.isPresent()).toBe(true);
        expect(visitTab.visits.length).toBeGreaterThan(0);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    xit('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    xit('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    xit('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    xit('should ', () => {

    });

});
