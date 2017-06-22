// Describes the "Profile" tabbed section of the 'Order Details' pop-up modal

import {ElementFinder} from "protractor";
import {ElementFactory} from "../../../../utils/elementUtilities";
import {ModalTab} from "../../global/class_ModalTab";
import {GeneralUtilities} from "../../../../utils/generalUtilities";
import {TitleValueElement} from "../../elements/titleValueElement";

export class OrderDetailsModalTabProfile extends ModalTab{

    contentContainer: ElementFinder;

    statusSection: ElementFinder;
    statusSectionTitle: ElementFinder;
    status: TitleValueElement;

    visitDetailsSection: ElementFinder;
    visitDetailsSectionTitle: ElementFinder;
    serviceProvider: TitleValueElement;
    payerProvider: TitleValueElement;
    accountNumber: TitleValueElement;
    mrn: TitleValueElement;

    orderInformationSection: ElementFinder;
    orderInformationSectionTitle: ElementFinder;
    orderingPhysician: TitleValueElement;
    externalId: TitleValueElement;
    orderingLocation: TitleValueElement;
    orderingSublocation: ElementFinder;
    priority: TitleValueElement;
    specimenId: TitleValueElement;
    specimenLocation: TitleValueElement;
    orderDateAndTime: TitleValueElement;
    receivedDateAndTime: TitleValueElement;


    constructor(tab: ElementFinder) {
        // console.log("  In constructor for 'OrderDetailsModalTabProfile'");
        super(tab);
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrderDetailsModalTabProfile'");

        if(!this.initializePromise) {

            await super.baseInitialize();
            await GeneralUtilities.initializationMessage(this.actualTab, 'OrderDetailsModalTabProfile');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.statusSection = await this.contentContainer.$$('div.order-form-column')[0];
                this.statusSectionTitle = await this.statusSection.$('div.form-header');
                this.status = await ElementFactory.make(TitleValueElement, this.statusSection.$('div.form-item'));

                this.visitDetailsSection = await this.contentContainer.$$('div.order-form-column')[1];
                this.visitDetailsSectionTitle = await this.visitDetailsSection.$('div.form-header');
                this.serviceProvider = await ElementFactory.make(TitleValueElement, this.visitDetailsSection.$('div.orderDetail-profileTab-serviceProvider div.form-item'));
                this.payerProvider = await ElementFactory.make(TitleValueElement, this.visitDetailsSection.$('div.orderDetail-profileTab-payerProvider div.form-item'));
                this.accountNumber = await ElementFactory.make(TitleValueElement, this.visitDetailsSection.$('div.orderDetail-profileTab-accountNumber div.form-item'));
                this.mrn = await ElementFactory.make(TitleValueElement, this.visitDetailsSection.$('div.orderDetail-profileTab-mrn div.form-item'));

                this.orderInformationSection = await this.contentContainer.$$('div.order-form-column')[2];
                this.orderInformationSectionTitle = await this.orderInformationSection.$('div.form-header');
                this.orderingPhysician = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-orderingPhysician'));
                this.externalId = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-externalId'));
                this.orderingLocation = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-orderingLocation'));
                this.orderingSublocation = await this.orderInformationSection.$('#orderingSublocation');
                this.priority = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-priority'));
                this.specimenId = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-specimenId'));
                this.specimenLocation = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-specimenLocation'));
                this.orderDateAndTime = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-orderDateTime'));
                this.receivedDateAndTime = await ElementFactory.make(TitleValueElement, this.orderInformationSection.$('div.orderDetail-profileTab-receivedDateTime'));

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async clickTab(): Promise<void> {
        // console.log("   In 'clickTab()' for 'OrderDetailsModalTabProfile'");
        return super.baseClickTab().then(async ()=> {
            return this.initialize();
        })
    }
}