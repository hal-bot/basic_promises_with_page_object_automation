import { $, $$ } from 'protractor';
import {Tab} from "./class_Tab";
import {ColumnHeader} from "../columnHeader";

class VisitTab extends Tab {

    showDischargedVisits_checkbox: object;
    createVisit_button: object;

    admissionDateHeader: ColumnHeader;
    visitTypeHeader: ColumnHeader;
    mrNoHeader: ColumnHeader;
    serviceProviderHeader: ColumnHeader;
    accountNumberHeader: ColumnHeader;
    locationHeader: ColumnHeader;

    visits: VisitRow[];

    constructor() {
        super($(''));

        this.showDischargedVisits_checkbox = $('');
        this.createVisit_button = $('');

        this.admissionDateHeader = new ColumnHeader($(''));
        this.visitTypeHeader = new ColumnHeader($(''));
        this.mrNoHeader = new ColumnHeader($(''));
        this.serviceProviderHeader = new ColumnHeader($(''));
        this.accountNumberHeader = new ColumnHeader($(''));
        this.locationHeader = new ColumnHeader($(''));

        this.setVisitsArray();
    }

    // This will clear out the current 'visits' array and then get the array rows
    setVisitsArray() {
        this.visits = [];
        $$('').each.do(function(visit) {
            this.visits.push(new VisitRow(visit));
        });
    }
}


class VisitRow {
    admissionDate: object;  // (DATE??)
    type: object;
    mrn: object;
    serviceProvider: object;
    accountNumber: object; // ??
    location: object;

    constructor(element) {
        this.admissionDate = element.$('');
        this.type = element.$('');
        this.mrn = element.$('');
        this.serviceProvider = element.$('');
        this.accountNumber = element.$('');
        this.location = element.$('');
    };

    getAdmissionDate(): string {
        return this.admissionDate.getText();
    }

    getType(): string {
        return this.type.getText();
    }

    getMRN(): number {
        return this.mrn.getText();
    }

    getServiceProvider(): string {
        return this.serviceProvider.getText();
    }

    getAccountNumber(): number {
        return this.accountNumber.getText();
    }

    getLocation(): string {
        return this.location.getText();
    }

}
