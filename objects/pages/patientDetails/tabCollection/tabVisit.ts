// Describes the "Visit" tab section seen on the Patient Details page

import { $, $$, ElementFinder } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../elements/columnHeader";
import {VisitDetailsModal} from "../visitModal/visitDetailsModal";
import {Checkbox} from "../../elements/checkbox";
import {ElementMethods} from "../../../../utils/elementUtilities";

export class VisitTab extends Tab {

    showDischargedVisits_checkbox: Checkbox;
    createVisit_button: ElementFinder;            // not yet implemented

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
        super($('li.patient-visit-tab'));

        this.showDischargedVisits_checkbox = new Checkbox(this.tabContentContainer.$('div.tab-actions'));
        // this.createVisit_button = this.tabContentContainer.$('');            // not yet implemented

        this.admissionDateHeader = new ColumnHeader($('th.visit-tableHeader-admissionDate'));
        this.visitTypeHeader = new ColumnHeader($('th.visit-tableHeader-type'));
        this.mrnHeader = new ColumnHeader($('th.visit-tableHeader-mrn'));
        this.serviceProviderHeader = new ColumnHeader($('th.visit-tableHeader-serviceProvider'));
        this.visitNoHeader = new ColumnHeader($('th.visit-tableHeader-externalVisitNumber'));
        this.accountNumberHeader = new ColumnHeader($('th.visit-tableHeader-accountNo'));
        this.locationHeader = new ColumnHeader($('th.visit-tableHeader-location'));

        this.setVisitsArray();

        this.visitsModal = new VisitDetailsModal();
    }

    // This will clear out the current 'visits' array and then get the array rows
    setVisitsArray(): Promise<any> {
        return ElementMethods.getCustomElementArray('tr.visit-tableRow', 'VisitRow').then(function(visitsArray) {
            return this.visits = visitsArray;
        });
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


export class VisitRow {
    admissionDate: ElementFinder;
    type: ElementFinder;
    mrn: ElementFinder;
    serviceProvider: ElementFinder;
    visitNo: ElementFinder;
    accountNumber: ElementFinder;
    location: ElementFinder;

    constructor(element) {
        this.admissionDate = element.$('td.visit-tableCell-admissionDate');
        this.type = element.$('td.visit-tableCell-visitTypeCode');
        this.mrn = element.$('td.visit-tableCell-mrn');
        this.serviceProvider = element.$('td.visit-tableCell-serviceProviderId');
        this.visitNo = element.$('td.visit-tableCell-externalVisitNumber');
        this.accountNumber = element.$('td.visit-tableCell-accountNumber');
        this.location = element.$('td.visit-tableCell-locationId');
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
