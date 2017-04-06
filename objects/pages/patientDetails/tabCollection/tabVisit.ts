// Describes the "Visit" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../columnHeader";

export class VisitTab extends Tab {

    showDischargedVisits_checkbox: ElementFinder;
    createVisit_button: ElementFinder;

    admissionDateHeader: ColumnHeader;
    visitTypeHeader: ColumnHeader;
    mrnHeader: ColumnHeader;
    serviceProviderHeader: ColumnHeader;
    visitNoHeader: ColumnHeader;
    accountNumberHeader: ColumnHeader;
    locationHeader: ColumnHeader;

    visits: VisitRow[];

    constructor() {
        super($(''));

        this.showDischargedVisits_checkbox = $('');
        this.createVisit_button = $('');

        this.admissionDateHeader = new ColumnHeader($(''));
        this.visitTypeHeader = new ColumnHeader($(''));
        this.mrnHeader = new ColumnHeader($(''));
        this.serviceProviderHeader = new ColumnHeader($(''));
        this.visitNoHeader = new ColumnHeader($(''));
        this.accountNumberHeader = new ColumnHeader($(''));
        this.locationHeader = new ColumnHeader($(''));

        this.setVisitsArray();
    }

    // This will clear out the current 'visits' array and then get the array rows
    setVisitsArray() {
        this.visits = [];
        // TODO: FINISH THE CODE HERE
        // $$('').each.do(function(visit) {
        //     this.visits.push(new VisitRow(visit));
        // });
    }
}


class VisitRow {
    admissionDate: ElementFinder;  // (DATE??)
    type: ElementFinder;
    mrn: ElementFinder;
    serviceProvider: ElementFinder;
    visitNo: ElementFinder;
    accountNumber: ElementFinder; // ??
    location: ElementFinder;

    constructor(element) {
        this.admissionDate = element.$('');
        this.type = element.$('');
        this.mrn = element.$('');
        this.serviceProvider = element.$('');
        this.visitNo = element.$('');
        this.accountNumber = element.$('');
        this.location = element.$('');
    };

    getAdmissionDate(): Promise<string> {
        return this.admissionDate.getText();
    }

    getType(): Promise<string> {
        return this.type.getText();
    }

    getMRN(): Promise<number> {
        return this.mrn.getText().then(function(value) {
            return Number(value);
        });
    }

    getServiceProvider(): Promise<string> {
        return this.serviceProvider.getText();
    }

    getVisitNo(): Promise<string> {
        return this.visitNo.getText();
    }

    getAccountNumber(): Promise<number> {
        return this.accountNumber.getText().then(function(value) {
            return Number(value);
        });
    }

    getLocation(): Promise<string> {
        return this.location.getText();
    }

}
