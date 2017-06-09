/**
 *  Description: This will test P1 tests for the contents of the Visit modal which is opened from the Patient Details page's Visit PageTab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */

import { VisitTab } from "../../../objects/pages/patientDetails/visits/tabVisits";
import { VisitDetailsModal } from "../../../objects/pages/patientDetails/visits/visitDetailsModal";

describe('The Visit Details modal\'s "Visit Information" tab (from the Patient\'s Details page) P1 level tests', () => {

    // let visitTab: VisitTab;             // the tab on the patient's details page
    let visitModal: VisitDetailsModal;  // the modal that opens by clicking a Visit No in the "Visits" tab

    beforeAll(() => {
        return VisitTab.UniversalOpenVisitsModal().then(async (modal)=> {
            visitModal = modal;
            return visitModal.initialize();
        });
    });

    afterAll( ()=> {
        return visitModal.closeModal();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/57, ER #1 **/
    it('should be present', () => {
        console.log("The 'Visit Details' modal should be present");
        return expect<any>(visitModal.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/57, ER #2-4 **/
    it('should have correct title, date, close button, and tabs', () => {
        console.log("The 'Visit Details' modal should have correct title, date, close button, and tabs");
        expect<any>(visitModal.title.getText()).toBe('Visit Details');
        expect<any>(visitModal.visitDate.isPresent()).toBe(true);
        expect<any>(visitModal.visitInformationSection.isPresent()).toBe(true);
        return expect<any>(visitModal.diagnosisSection.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/58 **/
    xit('should be showing the correct visit information fields (ELEMENTS NEED TO BE IMPLEMENTED)', () => {
        console.log("The 'Visit Details' modal should be showing the correct visit information fields");

        expect<any>(visitModal.visitInformationSection.admissionDate.getTitle()).toBe('Admission Date');
        expect<any>(visitModal.visitInformationSection.admissionDate.getValue()).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);  // 03/18/2008
        expect<any>(visitModal.visitInformationSection.dischargeDate.getTitle()).toBe('Discharge Date');
        expect<any>(visitModal.visitInformationSection.visitType.getTitle()).toBe('Visit Type');
        expect<any>(visitModal.visitInformationSection.visitType.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.visitNumber.getTitle()).toBe('Visit No');
        expect<any>(visitModal.visitInformationSection.visitNumber.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.patientLocation.getTitle()).toBe('Patient Location');
        expect<any>(visitModal.visitInformationSection.patientLocation.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.patientSublocation.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.accountNumber.getTitle()).toBe('Account Number');
        expect<any>(visitModal.visitInformationSection.accountNumber.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.mrNo.getTitle()).toBe('MRN');
        expect<any>(visitModal.visitInformationSection.mrNo.getValue()).not.toBe('');
        expect<any>(visitModal.visitInformationSection.admitPhysician.getTitle()).toBe('Admit. Physician');
        expect<any>(visitModal.visitInformationSection.serviceProvider.getTitle()).toBe('Service Provider');
        return expect<any>(visitModal.visitInformationSection.payerProvider.getTitle()).toBe('Payer Provider');
    });

});
