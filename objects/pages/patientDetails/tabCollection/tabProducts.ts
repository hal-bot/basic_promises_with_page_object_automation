// Describes the "Products" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../elements/columnHeader";

export class ProductsTab extends Tab {

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
        super($(''));

        this.adrOnlyCheckbox = $('');

        this.allComponentsFilter = new ProductsFilter($(''));
        this.workInProgressFilter = new ProductsFilter($(''));
        this.readyToIssueFilter = new ProductsFilter($(''));
        this.issuedFilter = new ProductsFilter($(''));
        this.transfusedFilter = new ProductsFilter($(''));

        this.statusHeader = new ColumnHeader($(''));
        this.unitNoHeader = new ColumnHeader($(''));
        this.productCodeHeader = new ColumnHeader($(''));
        this.productHeader = new ColumnHeader($(''));
        this.abo_rhHeader = new ColumnHeader($(''));
        this.expirationDateTimeHeader = new ColumnHeader($(''));
        this.specimenHeader = new ColumnHeader($(''));
        this.adrHeader = new ColumnHeader($(''));

        this.setProductsArray();
    }

    // This will clear out the current 'visits' array and then get the array rows
    setProductsArray() {
        this.products = [];
        // TODO: FINISH THE CODE HERE
        // $$('').each.do(function(visit) {
        //     this.visits.push(new VisitRow(visit));
        // });
    }

}

class ProductsFilter {
    title: ElementFinder;
    count: ElementFinder;

    constructor(element: ElementFinder) {
        this.title = element.$('');
        this.count = element.$('');
    }
}

class ProductRow {
    status: ElementFinder;
    unitNo: ElementFinder;
    productCode: ElementFinder;
    product: ElementFinder;
    abo_rh: ElementFinder;
    expirationDateTime: ElementFinder;
    specimen: ElementFinder;
    adr: ElementFinder;


    constructor(element) {
        this.status = element.$('');
        this.unitNo = element.$('');
        this.productCode = element.$('');
        this.product = element.$('');
        this.abo_rh = element.$('');
        this.expirationDateTime = element.$('');
        this.specimen = element.$('');
        this.adr = element.$('');
    };

    getStatus(): Promise<string> {
        return this.status.getText();
    }

    getUnitNo(): Promise<string> {
        return this.unitNo.getText();
    }

    getProductCode(): Promise<string> {
        return this.productCode.getText();
    }

    getProduct(): Promise<string> {
        return this.product.getText();
    }

    getAbo_rh(): Promise<string> {
        return this.abo_rh.getText();
    }

    getExpirationDateTime(): Promise<string> {
        return this.expirationDateTime.getText();
    }

    getSpecimen(): Promise<string> {
        return this.specimen.getText();
    }

    getADR(): Promise<string> {
        return this.adr.getText();
    }

}