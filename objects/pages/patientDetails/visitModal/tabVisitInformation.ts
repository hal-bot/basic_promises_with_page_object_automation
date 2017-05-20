// Describes the "Visit Information" tabbed section of the 'Visit Details' pop-up modal

import {TitleValueElement} from "../../elements/titleValueElement";
import {ElementFinder} from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";

export class TabVisitInformation {

    private initializePromise: Promise<void>;

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
    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'TabVisitInformation'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitTab'");

        if (!this.initializePromise) {
            ElementMethods.initializationMessage(this.element, 'TabVisitInformation');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.admissionDate = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.dischargeDate = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.visitType = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.patientLocation = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.patientSublocation = await ElementFactory.make(TitleValueElement, this.element.$(''));

                this.accountNumber = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.mrNo = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.admitPhysician = await ElementFactory.make(TitleValueElement, this.element.$(''));

                this.serviceProvider = await ElementFactory.make(TitleValueElement, this.element.$(''));
                this.payerProvider = await ElementFactory.make(TitleValueElement, this.element.$(''));

                return resolve();
            }).then(async (resolve) => {
                console.log("\tNow initializing all elements just defined for 'TabVisitInformation'");
                await this.admissionDate.initialize();
                await this.dischargeDate.initialize();
                await this.visitType.initialize();
                await this.patientLocation.initialize();
                await this.patientSublocation.initialize();
                await this.accountNumber.initialize();

                await this.mrNo.initialize();
                await this.admitPhysician.initialize();

                await this.serviceProvider.initialize();
                await this.payerProvider.initialize();

                return resolve;
            });
        }
    }

}
