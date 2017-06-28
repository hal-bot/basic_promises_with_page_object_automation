/**
 *  Description: This will test P1 tests for the contents of the Visit tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-55
 */

import {VisitTab} from "../../../objects/pages/patientDetails/visits/tabVisits";
import {NavigationMethods} from "../../../utils/navigationUtilities";

describe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;

    beforeAll(async () => {
        await NavigationMethods.navigateToAPatientPageLikeAUser();
        await NavigationMethods.waitForLoadCompletion('table.visit-table');
        visitTab = await new VisitTab();
        return visitTab.initialize();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/62 **/
    it('should be present, selected, and have the title "Visit" - Case 62', () => {
        console.log("The 'Visits' tab on the Patients Details page should match the current year");
        expect<any>(visitTab.actualTab.isPresent()).toBe(true);
        expect<any>(visitTab.isSelected()).toBe(true);
        expect<any>(visitTab.getTabTitle()).toBe("Visits");
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/42 **/
    it('should display the proper elements above the grid - Case 42', () => {
        console.log("The 'Visits' tab on the Patients Details page should display the proper elements above the grid");
        expect<any>(visitTab.title.isPresent()).toBe(true);
        expect<any>(visitTab.showDischargedVisits_checkbox.isPresent()).toBe(true);
        expect<any>(visitTab.visits.length).toBeGreaterThan(0);
    });

    // /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/64, Expected Result #1 **/
    // // TODO: introduce test once Create Visit button has been implemented
    // xit('should have the checkbox to the left of the Create Visit button', () => {
    //     console.log("The 'Visits' tab on the Patients Details page should have the checkbox to the left of the Create Visit button");
    //     visitTab.showDischargedVisits_checkbox.getLocation().then(function( dischargedVisitsCheckboxLocation ) {
    //         visitTab.createVisit_button.getLocation().then(function( createVisitButtonLocation ) {
    //             expect(dischargedVisitsCheckboxLocation.x).toBeLessThan(createVisitButtonLocation.x)
    //         });
    //     });
    //     expect(visitTab.showDischargedVisits_checkbox.attr('checked') ).toBeFalsy();
    // });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/64 **/
    it('should display the correct column headers - Case 64', () => {
        console.log("The 'Visits' tab on the Patients Details page should display the correct column headers");
        expect<any>(visitTab.showDischargedVisits_checkbox.isPresent()).toBe(true);
        expect<any>(visitTab.showDischargedVisits_checkbox.isSelected()).toBe(false);
        expect<any>(visitTab.admissionDateHeader.isPresent()).toBe(true);
        expect<any>(visitTab.visitTypeHeader.isPresent()).toBe(true);
        expect<any>(visitTab.mrnHeader.isPresent()).toBe(true);
        expect<any>(visitTab.serviceProviderHeader.isPresent()).toBe(true);
        expect<any>(visitTab.visitNoHeader.isPresent()).toBe(true);
        expect<any>(visitTab.accountNumberHeader.isPresent()).toBe(true);
        expect<any>(visitTab.locationHeader.isPresent()).toBe(true);
    });

    // TODO - add case to description when sorting order (desc/asc) is possible
    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/65, Expected Result #1 **/
    it('should be default sorted by Admission Date', () => {
        console.log("The 'Visits' tab on the Patients Details page should be default sorted by Admission Date");
        expect<any>(visitTab.admissionDateHeader.isBeingUsedForSorting()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/66**/
    // Note: assumes the patient has >6 visits
    it('should have 6 records on the page, have the correct pagination - Case 66', () => {
        console.log("The 'Visits' tab on the Patients Details page should have 6 records on the page, have the correct pagination");
        expect(visitTab.visits.length).toBe(6);
        expect<any>(visitTab.leftArrow.isPresent()).toBe(true);
        expect<any>(visitTab.pages.length).toBeGreaterThanOrEqual(1);
        return expect<any>(visitTab.rightArrow.isPresent()).toBe(true);
    });

    /**
     *  TODO...
     *  - Case 65, #2 -> arrows in headers
     *  - Case 65, #3 -> column headers sort properly
     */

});
