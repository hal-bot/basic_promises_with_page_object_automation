/**
 *  Description: This will test P1 tests for the contents of the Visit modal's "Diagnosis" tab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */

import {VisitTab} from "../../../objects/pages/patientDetails/visits/tabVisits";
import {VisitDetailsModal} from "../../../objects/pages/patientDetails/visits/visitDetailsModal_general";

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
    it('should be showing the correct diagnosis grid headers and show diagnosis records - Case 59', () => {
        console.log("The 'Visit Details' modal should be showing the correct diagnosis grid headers and show diagnosis records");

        expect<any>(visitModal.diagnosisSection.diagnoses.length).toBeGreaterThan(0);
        expect<any>(visitModal.diagnosisSection.diagnosisHeader.getTitle()).toBe('Diagnosis');
        expect<any>(visitModal.diagnosisSection.codeHeader.getTitle()).toBe('Code');
        expect<any>(visitModal.diagnosisSection.startDateHeader.getTitle()).toBe('Start Date');
        expect<any>(visitModal.diagnosisSection.endDateHeader.getTitle()).toBe('End Date');
        return expect<any>(visitModal.diagnosisSection.commentHeader.getTitle()).toBe('Comment');
    });

    // TODO - add case to description when sorting order (desc/asc) is possible
    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/60 **/
    it('should be sorted by the Diagnosis field', () => {
        console.log("The 'Visit Details' modal should be sorted by the Diagnosis field");
        return expect<any>(visitModal.diagnosisSection.diagnosisHeader.isBeingUsedForSorting()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/68 **/
    it('should have a maximum of 6 records on the page - Case 68', () => {
        console.log("The 'Visit Details' modal should have a maximum of 6 records on the page");
        expect<any>(visitModal.diagnosisSection.diagnoses.length).toBe(6);
        expect<any>(visitModal.diagnosisSection.leftArrow.isPresent()).toBe(true);
        expect<any>(visitModal.diagnosisSection.pages.length).toBeGreaterThanOrEqual(1);
        return expect<any>(visitModal.diagnosisSection.rightArrow.isPresent()).toBe(true);
    });


    /**
     *  TODO...
     *  - Case 61 -> column headers sort properly
     */

});
