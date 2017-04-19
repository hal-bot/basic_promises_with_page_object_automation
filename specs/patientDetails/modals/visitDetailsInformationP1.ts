/**
 *  Description: This will test P1 tests for the contents of the Visit tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-55
 */

import { browser } from 'protractor';
import { VisitTab } from "../../../objects/pages/patientDetails/tabCollection/tabVisit";
import { NavigationMethods } from "../../../utils/navigationUtilities";
import { VisitDetailsModal } from "../../../objects/pages/patientDetails/visitModal/visitDetailsModal";

xdescribe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;
    let visitModal: VisitDetailsModal;

    beforeAll( () => {
        browser.get('/');
        NavigationMethods.navigateToAPatientPage();
        visitTab = new VisitTab();
        visitTab.visits[0].visitNo.click();     //opens the Visit modal
        visitModal = new VisitDetailsModal();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should be present, have correct title & date', () => {
        expect(visitModal.isPresent()).toBe(true);
        expect(visitModal.title.getText()).toBe('Visit Details');
        expect(visitModal.visitDate.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    // Note: assumes the patient has >6 visits
    it('should have 6 records on the page', () => {
        expect(visitTab.visits.length).toBe(6);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should ', () => {

    });

});
