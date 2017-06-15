/**
 *  Description: This will test P1 tests for the contents of the Products tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-145
 */

import {NavigationMethods} from "../../../utils/navigationUtilities";
import {ProductsTab} from "../../../objects/pages/patientDetails/products/tabProducts";

fdescribe('The "Products" tab on the Patient\'s Details page (from a P1 level)', () => {

    let productsTab: ProductsTab;

    beforeAll(async () => {
        await NavigationMethods.navigateToAPatientPageLikeAUser();
        await NavigationMethods.waitForLoadCompletion('table.visit-table');
        productsTab = await new ProductsTab();
        return productsTab.baseInitialize().then(async ()=> {
            await productsTab.actualTab.click();
            return productsTab.initialize();
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/228 **/
    it('should be present and selected', () => {
        console.log("The 'Products' tab on the Patients Details page should be present and selected");

        expect<any>(productsTab.actualTab.isPresent()).toBe(true);
        expect<any>(productsTab.isSelected()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/230 **/
    it('should have the correct product filters', () => {
        console.log("The 'Products' tab on the Patients Details page should have the correct product filters");

        expect<any>(productsTab.allComponentsFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("All Components");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.workInProgressFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("Work in Progress");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.readyToIssueFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("Ready to Issue");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.issuedFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("Issued");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.transfusedFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("Transfused");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);
    });

});
