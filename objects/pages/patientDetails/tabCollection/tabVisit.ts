// Describes the "Visit" tab section seen on the Patient Details page

import { $, ElementFinder, browser } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../columnHeader";
import {VisitDetailsModal} from "../visitModal/visitDetailsModal";

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

    visitsModal: VisitDetailsModal;

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

        this.visitsModal = new VisitDetailsModal();
    }

    // This will clear out the current 'visits' array and then get the array rows
    setVisitsArray() {
        this.visits = [];
        // TODO: FINISH THE CODE HERE
        // $$('').each.do(function(visit) {
        //     this.visits.push(new VisitRow(visit));
        // });
    }

    // this will return the admission date of the visit that's being opened.  The date is needed to verify the date in the Modal
    // TODO: FINISH THIS!
    // openTheVisitsModal(): Promise<any> {
    //     if (this.visitsModal.isPresent()) {
    //         browser.driver.navigate().refresh();   // Refreshing the page will git rid of the modal if it's already open
    //     }
    //     let visit = this.visits[0];
    //     let visitData: {admissionDate: string, type: string, mrn: string, serviceProvider: string, visitNo: string, accountNo: string, location: string} = {
    //
    //     }
    //
    //     return visit.getAdmissionDate().then(function(date) {
    //         return visit.click().then(function() {
    //             return date;
    //         });
    //     })
    // }
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

    getMRN(): Promise<string> {
        return this.mrn.getText();
    }

    getServiceProvider(): Promise<string> {
        return this.serviceProvider.getText();
    }

    getVisitNo(): Promise<string> {
        return this.visitNo.getText();
    }

    getAccountNumber(): Promise<string> {
        return this.accountNumber.getText();
    }

    getLocation(): Promise<string> {
        return this.location.getText();
    }

    click(): Promise<any> {
        return this.visitNo.click();
    }

    // TODO: Finish this!
    // getVisitDetails() {
    //     return this.getAdmissionDate().then(function(admissionDate) {
    //         return this.getType().then(function(type) {
    //             return this.getMRN().then(function(mrn) {
    //                 return this.getServiveProvider().then(function(serviceProvider) {
    //                     return this.getVisitNo().then(function(visitNo) {
    //                         return this.getAccountNumber().then(function(accountNo) {
    //                             return this.getLocation().then(function(location) {
    //                                 enum VisitDetails {
    //                                     admissionDate = admissionDate,
    //
    //                                 }
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // }

}
