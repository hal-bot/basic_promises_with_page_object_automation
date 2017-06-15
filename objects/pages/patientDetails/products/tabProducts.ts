// Describes the "Products" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import {PageTab} from "../class_PageTab";
import {ColumnHeader} from "../../elements/columnHeader";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";

export class ProductsTab extends PageTab {

    adrOnlyCheckbox: ElementFinder;

    allComponentsFilter: ProductsFilter;
    workInProgressFilter: ProductsFilter;
    readyToIssueFilter: ProductsFilter;
    issuedFilter: ProductsFilter;
    transfusedFilter: ProductsFilter;

    statusHeader: ColumnHeader;
    unitNoHeader: ColumnHeader;
    productCodeHeader: ColumnHeader;
    productHeader: ColumnHeader;
    abo_rhHeader: ColumnHeader;
    expirationDateTimeHeader: ColumnHeader;
    specimenHeader: ColumnHeader;
    adrHeader: ColumnHeader;

    products: ProductRow[];

    constructor() {
        // console.log("  In constructor for 'ProductsTab'");
        super($('li.patient-products-tab'));
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'ProductsTab'");

        if(!this.initializePromise) {
            await super.baseInitialize();

            // await ElementMethods.initializationMessage(null, 'ProductsTab');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.adrOnlyCheckbox = await $('div.tab-actions');

                this.allComponentsFilter = await ElementFactory.make(ProductsFilter, $('a.filterHeader-all'));
                this.workInProgressFilter = await ElementFactory.make(ProductsFilter, $('a.filterHeader-anchor-WorkinProgress'));
                this.readyToIssueFilter = await ElementFactory.make(ProductsFilter, $('a.filterHeader-anchor-ReadytoIssue'));
                this.issuedFilter = await ElementFactory.make(ProductsFilter, $('a.filterHeader-anchor-Issued'));
                this.transfusedFilter = await ElementFactory.make(ProductsFilter, $('a.filterHeader-anchor-Transfused'));

                this.statusHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-statusCode'));
                this.unitNoHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-unitNumber'));
                this.productCodeHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-productCode'));
                this.productHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-standardProductTypeCode'));
                this.abo_rhHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-aboRh'));
                this.expirationDateTimeHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-expirationDateTimeObj'));
                this.specimenHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-specimenId'));
                this.adrHeader = await ElementFactory.make(ColumnHeader, $('th.columnHeader-adr'));


                return this.setProductsArray().then(async ()=> {
                    await this.allComponentsFilter.initialize();
                    await this.workInProgressFilter.initialize();
                    await this.readyToIssueFilter.initialize();
                    await this.issuedFilter.initialize();
                    await this.transfusedFilter.initialize();

                    await this.statusHeader.initialize();
                    await this.unitNoHeader.initialize();
                    await this.productCodeHeader.initialize();
                    await this.productHeader.initialize();
                    await this.abo_rhHeader.initialize();
                    await this.expirationDateTimeHeader.initialize();
                    await this.specimenHeader.initialize();
                    await this.adrHeader.initialize();

                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    async setProductsArray(): Promise<void> {
        return ElementMethods.getCustomElementArray('tr.dataRow-products', 'ProductRow').then(async (productArray)=> {
            let resolvingPromise;
            this.products = productArray;

            for (let i = 0; i < this.products.length; i++) {
                // console.log("Initializing product row " + i);
                resolvingPromise = await this.products[i].initialize();
            }

            return resolvingPromise;
        });
    }

}

class ProductsFilter {

    title: ElementFinder;
    count: ElementFinder;

    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'ProductsFilter'");
    }

    async initialize(): Promise<void> {
        // await ElementMethods.initializationMessage(null, 'ProductsFilter');

        return new Promise<void>(async (resolve) => {
            this.title = await this.element.$('span');
            this.count = await this.element.$('div.header-count');

            return resolve();
        });
    }
}

export class ProductRow {

    status: ElementFinder;
    unitNo: ElementFinder;
    productCode: ElementFinder;
    product: ElementFinder;
    abo_rh: ElementFinder;
    expirationDateTime: ElementFinder;
    specimen: ElementFinder;
    adr: ElementFinder;


    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'ProductRow'");

    };

    async initialize(): Promise<void> {
        // await ElementMethods.initializationMessage(null, 'ProductRow');

        return new Promise<void>(async (resolve) => {
            this.status = await this.element.$('td.dataColumn-statusLiteral');
            this.unitNo = await this.element.$('td.dataColumn-unitNumber');
            this.productCode = await this.element.$('td.dataColumn-productCode');
            this.product = await this.element.$('td.dataColumn-standardProductTypeCode');
            this.abo_rh = await this.element.$('td.dataColumn-aboRh');
            this.expirationDateTime = await this.element.$('td.dataColumn-expirationDateTimeObj');
            this.specimen = await this.element.$('td.dataColumn-specimenObj');
            this.adr = await this.element.$('td.dataColumn-adr');

            return resolve();
        });
    }

    //  TODO - if these ever are needed, address with 'return new Promise(()=> { });' code
    // getStatus(): Promise<string> {
    //     return this.status.getText();
    // }
    //
    // getUnitNo(): Promise<string> {
    //     return this.unitNo.getText();
    // }
    //
    // getProductCode(): Promise<string> {
    //     return this.productCode.getText();
    // }
    //
    // getProduct(): Promise<string> {
    //     return this.product.getText();
    // }
    //
    // getAbo_rh(): Promise<string> {
    //     return this.abo_rh.getText();
    // }
    //
    // getExpirationDateTime(): Promise<string> {
    //     return this.expirationDateTime.getText();
    // }
    //
    // getSpecimen(): Promise<string> {
    //     return this.specimen.getText();
    // }
    //
    // getADR(): Promise<string> {
    //     return this.adr.getText();
    // }

}