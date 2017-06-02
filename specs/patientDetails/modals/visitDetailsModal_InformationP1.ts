/**
 *  Description: This will test P1 tests for the contents of the Visit modal which is opened from the Patient Details page's Visit Tab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */

import { VisitTab } from "../../../objects/pages/patientDetails/tabCollection/tabVisit";
import { NavigationMethods } from "../../../utils/navigationUtilities";
import { VisitDetailsModal } from "../../../objects/pages/patientDetails/visitModal/visitDetailsModal";

fdescribe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;
    let visitModal: VisitDetailsModal;

    beforeAll(() => {
        return NavigationMethods.navigateToAPatientPageQuickly('65858').then(()=> {
            return NavigationMethods.waitForLoadCompletion('table.visit-table').then(()=> {
                return visitTab = new VisitTab();
            }).then(async()=> {
                return visitTab.initialize().then(async ()=> {
                    console.log("HERE 2.1");
                    await visitTab.openViewModal();     //opens the Visit modal
                    console.log("HERE 2.2");
                    return visitModal = visitTab.visitsModal;
                });
            }).then(async()=> {
                console.log("HERE 3");
                return visitModal.initialize();
            });
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/57, EC #1 **/
    fit('should be present', () => {
        expect<any>(visitModal.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/57, EC #2-4 **/
    it('should have correct title & date', () => {
        expect<any>(visitModal.title.getText()).toBe('Visit Details');
        expect<any>(visitModal.visitDate.isPresent()).toBe(true);
        expect<any>(visitModal.closeButton.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    // Note: assumes the patient has >6 visits
    it('should have 6 records on the page', () => {
        expect<any>(visitTab.visits.length).toBe(6);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should ', () => {

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/ **/
    it('should ', () => {

    });

});
