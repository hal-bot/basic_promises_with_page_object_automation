// Describes the "Visit Information" tabbed section of the 'Visit Details' pop-up modal

import {TitleValueElement} from "../../elements/titleValueElement";
import {ElementFinder, $, browser} from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {ModalTab} from "../../global/class_ModalTab";

export class TabVisitInformation extends ModalTab {

    admissionDate: TitleValueElement;
    dischargeDate: TitleValueElement;
    visitType: TitleValueElement;
    visitNumber: TitleValueElement;
    patientLocation: TitleValueElement;
    patientSublocation: TitleValueElement;

    accountNumber: TitleValueElement;
    mrNo: TitleValueElement;
    admitPhysician: TitleValueElement;

    serviceProvider: TitleValueElement;
    payerProvider: TitleValueElement;

    // element will be the container which has all the data for the tab
    constructor(tab: ElementFinder) {
        // console.log("  In constructor for 'TabVisitInformation'");
        super(tab);
    }

    async initialize(): Promise<void> {

        if (!this.initializePromise) {

            await super.baseInitialize();
            // await ElementMethods.initializationMessage(this.actualTab, 'TabVisitInformation');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.admissionDate = await ElementFactory.make(TitleValueElement, this.contentContainer.$('.visitModal-infoTab-admissionDate'));
                this.dischargeDate = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.visitType = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.visitNumber = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.patientLocation = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.patientSublocation = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));

                this.accountNumber = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.mrNo = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.admitPhysician = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));

                this.serviceProvider = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));
                this.payerProvider = await ElementFactory.make(TitleValueElement, this.contentContainer.$(''));

                return resolve();
            }).then(async (resolve) => {
                // console.log("\tNow initializing all elements just defined for 'TabVisitInformation'");
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

        return this.initializePromise;
    }

    async clickTab(): Promise<void> {
        return super.baseClickTab().then(()=> {
            return this.initialize();
        })
    }

}
