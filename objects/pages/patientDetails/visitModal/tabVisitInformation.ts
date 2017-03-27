// Describes the "Visit Information" tabbed section of the 'Visit Details' pop-up modal

import {TitleValueElement} from "../../titleValueElement";

export class TabVisitInformation {

    admissionDate: TitleValueElement;
    dischargeDate: TitleValueElement;
    visitType: TitleValueElement;
    patientLocation: TitleValueElement;
    patientSublocation: TitleValueElement;

    accountNumber: TitleValueElement;
    mrNo: TitleValueElement;
    admitPhysician: TitleValueElement;

    serviceProvider: TitleValueElement;
    payerProvider: TitleValueElement;

    // element will be the container which has all the data for the tab
    constructor(element) {
        this.admissionDate = new TitleValueElement(element.$(''));
        this.dischargeDate = new TitleValueElement(element.$(''));
        this.visitType = new TitleValueElement(element.$(''));
        this.patientLocation = new TitleValueElement(element.$(''));
        this.patientSublocation = new TitleValueElement(element.$(''));

        this.accountNumber = new TitleValueElement(element.$(''));
        this.mrNo = new TitleValueElement(element.$(''));
        this.admitPhysician = new TitleValueElement(element.$(''));

        this.serviceProvider = new TitleValueElement(element.$(''));
        this.payerProvider = new TitleValueElement(element.$(''));
    }

}
