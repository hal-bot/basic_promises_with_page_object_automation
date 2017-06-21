/**
 *  Description: This will test P1 tests for the contents of the Visit modal's "Diagnosis" tab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */

import {VisitTab} from "../../../objects/pages/patientDetails/visits/tabVisits";
import {VisitDetailsModal} from "../../../objects/pages/patientDetails/visits/visitDetailsModal";

describe('The Visit Details modal\'s "Diagnoses" tab (from the Patient\'s Details page) P1 level tests ', () => {

    let visitModal: VisitDetailsModal;  // the modal that opens by clicking a Visit No in the "Visits" tab

    beforeAll( ()=> {
        return VisitTab.UniversalOpenVisitsModal('25472').then(async (modal)=> {
            visitModal = modal;
            return visitModal.diagnosisSection.clickTab();
        });
    });

    afterAll( ()=> {
        return visitModal.closeModal();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/59 **/
    it('should be showing the correct diagnosis grid headers and show diagnosis records', () => {
        console.log("The 'Visit Details' modal should be showing the correct diagnosis grid headers and show diagnosis records");

        expect<any>(visitModal.diagnosisSection.diagnoses.length).toBeGreaterThan(0);
        expect<any>(visitModal.diagnosisSection.diagnosisHeader.getTitle()).toBe('Diagnosis');
        expect<any>(visitModal.diagnosisSection.codeHeader.getTitle()).toBe('Code');
        expect<any>(visitModal.diagnosisSection.startDateHeader.getTitle()).toBe('Start Date');
        expect<any>(visitModal.diagnosisSection.endDateHeader.getTitle()).toBe('End Date');
        return expect<any>(visitModal.diagnosisSection.commentHeader.getTitle()).toBe('Comment');
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/60 **/
    it('should be sorted by the Diagnosis field', () => {
        console.log("The 'Visit Details' modal should be sorted by the Diagnosis field");
        return expect<any>(visitModal.diagnosisSection.diagnosisHeader.isBeingUsedForSorting()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/68, ER #1 **/
    it('should have a maximum of 6 records o the page', () => {
        console.log("The 'Visit Details' modal should have a maximum of 6 records on the page");
        return expect<any>(visitModal.diagnosisSection.diagnoses.length).toBe(6);
    });


    /**
     *  TODO...
     *  - Case 61 -> column headers sort properly
     *  - Case 68, #2 -> User should be able to see below the grid page number with back navigation arrow and forward navigation arrow.
     */

});
