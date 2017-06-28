/**
 *  Description: This will test P1 tests for the contents of the Products tab found on the Patient Details page
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-145
 */

import {NavigationMethods} from "../../../utils/navigationUtilities";
import {ProductsTab} from "../../../objects/pages/patientDetails/products/tabProducts";
import {browser} from "protractor";

describe('The "Products" tab on the Patient\'s Details page (from a P1 level)', () => {

    let productsTab: ProductsTab;

    beforeAll(async () => {
        await NavigationMethods.navigateToAPatientPageQuickly('1000');
        await NavigationMethods.waitForLoadCompletion('table.visit-table');
        productsTab = await new ProductsTab();
        return productsTab.baseInitialize().then(async ()=> {
            await productsTab.actualTab.click();
            return productsTab.initialize();
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/228 **/
    it('should be present and selected - Case 228', () => {
        console.log("The 'Products' tab on the Patients Details page should be present and selected");

        expect<any>(productsTab.actualTab.isPresent()).toBe(true);
        expect<any>(productsTab.isSelected()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/230 **/
    it('should have the correct product filters - Case 230', () => {
        console.log("The 'Products' tab on the Patients Details page should have the correct product filters");

        expect<any>(productsTab.allComponentsFilter.isPresent()).toBe(true);
        expect<any>(productsTab.allComponentsFilter.getTitle()).toBe("All Components");
        expect<any>(productsTab.allComponentsFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.workInProgressFilter.isPresent()).toBe(true);
        expect<any>(productsTab.workInProgressFilter.getTitle()).toBe("Work in Progress");
        expect<any>(productsTab.workInProgressFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.readyToIssueFilter.isPresent()).toBe(true);
        expect<any>(productsTab.readyToIssueFilter.getTitle()).toBe("Ready to Issue");
        expect<any>(productsTab.readyToIssueFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.issuedFilter.isPresent()).toBe(true);
        expect<any>(productsTab.issuedFilter.getTitle()).toBe("Issued");
        expect<any>(productsTab.issuedFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.transfusedFilter.isPresent()).toBe(true);
        expect<any>(productsTab.transfusedFilter.getTitle()).toBe("Transfused");
        expect<any>(productsTab.transfusedFilter.getCount()).toBeGreaterThanOrEqual(0);

        expect<any>(productsTab.adrCheckboxPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/232 **/
    it('should have the correct product column headers and have products - Case 232', () => {
        console.log("The 'Products' tab on the Patients Details page should have the correct product column headers and have products");

        expect<any>(productsTab.statusHeader.isPresent()).toBe(true);
        expect<any>(productsTab.statusHeader.getTitle()).toBe("Status");

        expect<any>(productsTab.unitNoHeader.isPresent()).toBe(true);
        expect<any>(productsTab.unitNoHeader.getTitle()).toBe("Unit No");

        expect<any>(productsTab.productCodeHeader.isPresent()).toBe(true);
        expect<any>(productsTab.productCodeHeader.getTitle()).toBe("Product Code");

        expect<any>(productsTab.productHeader.isPresent()).toBe(true);
        expect<any>(productsTab.productHeader.getTitle()).toBe("Product");

        expect<any>(productsTab.abo_rhHeader.isPresent()).toBe(true);
        expect<any>(productsTab.abo_rhHeader.getTitle()).toBe("ABO/Rh");

        expect<any>(productsTab.expirationDateTimeHeader.isPresent()).toBe(true);
        expect<any>(productsTab.expirationDateTimeHeader.getTitle()).toBe("Expiration Date & Time");

        expect<any>(productsTab.specimenHeader.isPresent()).toBe(true);
        expect<any>(productsTab.specimenHeader.getTitle()).toBe("Specimen");

        expect<any>(productsTab.adrHeader.isPresent()).toBe(true);
        expect<any>(productsTab.adrHeader.getTitle()).toBe("A/D/R");

        expect<any>(productsTab.products.length).toBeGreaterThan(0);
    });

    // TODO - add case to description when sorting order (desc/asc) is possible
    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/236 **/
    it('should be sorted by Status by default', () => {
        console.log("The 'Products' tab on the Patients Details page should be sorted by Status by default");

        expect<any>(productsTab.statusHeader.isBeingUsedForSorting()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/238  **/
    it('should show five products in the grid after a browser resize - Case 238', () => {
        console.log("The 'Products' tab on the Patients Details page should show five products in the grid after a browser resize");

        expect<any>(productsTab.products.length).toBe(5);
        expect<any>(productsTab.leftArrow.isPresent()).toBe(true);
        expect<any>(productsTab.pages.length).toBeGreaterThanOrEqual(1);
        expect<any>(productsTab.rightArrow.isPresent()).toBe(true);

        return browser.driver.manage().window().setSize(300, 480).then(()=> {
            expect<any>(productsTab.products.length).toBe(5);
            expect<any>(productsTab.leftArrow.isPresent()).toBe(true);
            expect<any>(productsTab.pages.length).toBeGreaterThanOrEqual(1);
            return expect<any>(productsTab.rightArrow.isPresent()).toBe(true);
        }).then(()=> {
            return browser.manage().window().maximize();
        });
    });

    // TODO - add case to description when you can verify results against the DB
    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/301, ER #1 **/
    it('should have a working \'A/D/R\' checkbox', () => {
        console.log("The 'Products' tab on the Patients Details page should have a working 'A/D/R' checkbox");

        return productsTab.selectADRcheckbox().then(()=> {
            return productsTab.products[0].adr.getText().then((adrText) => {
                return expect<any>(adrText).not.toBe("");
            });
        }).then(()=> {
            return productsTab.sortBy(productsTab.adrHeader).then(async ()=> {
                return productsTab.products[0].adr.getText().then((adrText)=> {
                    return expect<any>(adrText).not.toBe("");
                });
            });
        }).then(()=> {
            return productsTab.sortBy(productsTab.adrHeader).then(async ()=> {
                return productsTab.products[0].adr.getText().then((adrText)=> {
                    return expect<any>(adrText).not.toBe("");
                });
            });
        }).then(()=> {
            return productsTab.deselectADRcheckbox();
        });
    });


    /**
     *  TODO...
     *  - Case 236 -> Verify sort direction
     *  - Case 237 -> Verify sorting on all columns
     *  - Case 301, ER #2 -> Verify A/D/R Only checkbox results align w/ the DB
     *  - Case 2577 -> Verify default filter
     */
});
