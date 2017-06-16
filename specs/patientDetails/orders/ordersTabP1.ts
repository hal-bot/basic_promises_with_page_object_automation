/**
 *  Description: This will test P1 tests for the contents of the Orders tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-144
 */

import {NavigationMethods} from "../../../utils/navigationUtilities";
import {OrdersTab} from "../../../objects/pages/patientDetails/orders/tabOrders";

describe('The "Orders" tab on the Patient\'s Details page (from a P1 level)', () => {

    let ordersTab: OrdersTab;

    beforeAll(async () => {
        await NavigationMethods.navigateToAPatientPageLikeAUser('25472');
        await NavigationMethods.waitForLoadCompletion('table.visit-table');
        ordersTab = await new OrdersTab();
        return ordersTab.baseInitialize().then(async ()=> {
            await ordersTab.actualTab.click();
            return ordersTab.initialize();
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/222 **/
    it('should be present, selected, and have the tab title "Orders"', () => {
        console.log("The 'Orders' tab on the Patients Details page should be present, selected, and have the title \"Orders\"");
        expect<any>(ordersTab.actualTab.isPresent()).toBe(true);
        expect<any>(ordersTab.isSelected()).toBe(true);
        expect<any>(ordersTab.getTabTitle()).toBe("Orders");
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/223 **/
    it('should have the section title "Orders List"', () => {
        console.log("The 'Orders' tab on the Patients Details page should have the section title \"Orders List\"");
        expect<any>(ordersTab.getSectionTitle()).toBe("Orders List");
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/224 **/
    it('should display the correct column headers, show order records', () => {
        console.log("The 'Orders' tab on the Patients Details page should display the correct column headers, show order records");
        expect<any>(ordersTab.statusHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.statusHeader.getTitle()).toBe('Status');
        expect<any>(ordersTab.orderIdHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.orderIdHeader.getTitle()).toBe('Order ID');
        expect<any>(ordersTab.orderDateTimeHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.orderDateTimeHeader.getTitle()).toBe('Order Date & Time');
        expect<any>(ordersTab.specimenHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.specimenHeader.getTitle()).toBe('Specimen');
        expect<any>(ordersTab.locationSublocationHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.locationSublocationHeader.getTitle()).toBe('Location/Sublocation');
        expect<any>(ordersTab.priorityHeader.isPresent()).toBe(true);
        expect<any>(ordersTab.priorityHeader.getTitle()).toBe('Priority');

        expect<any>(ordersTab.orders.length).toBeGreaterThan(0);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/225, ER #1 **/
    it('should be default sorted by Status', () => {
        console.log("The 'Orders' tab on the Patients Details page should be default sorted by Status");
        expect<any>(ordersTab.statusHeader.isBeingUsedForSorting()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/226, ER #1 **/
    // Note: assumes the patient has >6 orders
    it('should have 6 records on the page', () => {
        console.log("The 'Orders' tab on the Patients Details page should have 6 records on the page");
        expect(ordersTab.orders.length).toBe(6);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/226, ER #2 **/
    it('should have pagination present', () => {
        console.log("The 'Orders' tab on the Patients Details page should have pagination present");
        expect(ordersTab.leftArrow.isPresent()).toBeTruthy();
        expect(ordersTab.rightArrow.isPresent()).toBeTruthy();
        expect(ordersTab.pages.length).toBeGreaterThanOrEqual(1);
    });



    /**
     *  TODO...
     *  - Case 225, ERs #2 & #3 -> Verifying sorting on all headers, sorting arrows
     *  - Case 227 -> cannot implement until the count has been implemented in the tab
     */

});
