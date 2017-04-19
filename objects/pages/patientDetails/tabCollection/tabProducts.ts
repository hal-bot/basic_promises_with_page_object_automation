// Describes the "Products" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../elements/columnHeader";
import {ElementMethods} from "../../../../utils/elementUtilities";

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
        super($('li.patient-products-tab'));

        this.adrOnlyCheckbox = $('div.tab-actions');

        this.allComponentsFilter = new ProductsFilter($('a.filterHeader-all'));
        this.workInProgressFilter = new ProductsFilter($('a.filterHeader-anchor-WorkinProgress'));
        this.readyToIssueFilter = new ProductsFilter($('a.filterHeader-anchor-ReadytoIssue'));
        this.issuedFilter = new ProductsFilter($('a.filterHeader-anchor-Issued'));
        this.transfusedFilter = new ProductsFilter($('a.filterHeader-anchor-Transfused'));

        this.statusHeader = new ColumnHeader($('th.columnHeader-statusCode'));
        this.unitNoHeader = new ColumnHeader($('th.columnHeader-unitNumber'));
        this.productCodeHeader = new ColumnHeader($('th.columnHeader-productCode'));
        this.productHeader = new ColumnHeader($('th.columnHeader-standardProductTypeCode'));
        this.abo_rhHeader = new ColumnHeader($('th.columnHeader-aboRh'));
        this.expirationDateTimeHeader = new ColumnHeader($('th.columnHeader-expirationDateTimeObj'));
        this.specimenHeader = new ColumnHeader($('th.columnHeader-specimenId'));
        this.adrHeader = new ColumnHeader($('th.columnHeader-adr'));

        this.setProductsArray();
    }

    setProductsArray() {
        return ElementMethods.getCustomElementArray('tr.', 'ProductRow').then(function(productArray) {
            return this.products = productArray;
        });
    }

}

class ProductsFilter {
    title: ElementFinder;
    count: ElementFinder;

    constructor(element: ElementFinder) {
        this.title = element.$('span');
        this.count = element.$('div.header-count');
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