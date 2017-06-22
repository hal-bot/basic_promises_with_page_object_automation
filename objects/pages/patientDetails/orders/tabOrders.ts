// Describes the "Orders" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import { ColumnHeader } from "../../elements/columnHeader";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {PageTab} from "../class_PageTab";
import {GeneralUtilities} from "../../../../utils/generalUtilities";
import {OrderDetailsModal} from "./orderDetailsModal_general";
import {NavigationMethods} from "../../../../utils/navigationUtilities";

export class OrdersTab extends PageTab {

    statusHeader: ColumnHeader;
    orderIdHeader: ColumnHeader;
    orderDateTimeHeader: ColumnHeader;
    specimenHeader: ColumnHeader;
    locationSublocationHeader: ColumnHeader;
    priorityHeader: ColumnHeader;

    private static thisTab: ElementFinder;

    orders: OrderRow[];

    orderDetailsModal: OrderDetailsModal;

    constructor() {
        // console.log("  In constructor for 'OrdersTab'");
        super($('li.patient-orders-tab'));

    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrdersTab'");

        if(!this.initializePromise) {
            await super.baseInitialize();

            OrdersTab.thisTab = await this.actualTab;

            // await GeneralUtilities.initializationMessage(null, 'OrdersTab');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.statusHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-status'));
                this.orderIdHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-orderID'));
                this.orderDateTimeHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-orderDateTime'));
                this.specimenHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-specimen'));
                this.locationSublocationHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-locationSubLocation'));
                this.priorityHeader = await ElementFactory.make(ColumnHeader, $('th.order-tableHeader-priority'));

                return this.setOrdersArray().then(async ()=> {
                    await this.statusHeader.initialize();
                    await this.orderIdHeader.initialize();
                    await this.orderDateTimeHeader.initialize();
                    await this.specimenHeader.initialize();
                    await this.locationSublocationHeader.initialize();
                    await this.priorityHeader.initialize();

                    await this.orderIdHeader.getTitle().then((title) => {
                        console.log(`\tHeader's title is ${title}`);
                    });

                    await $('th.order-tableHeader-orderID').getText().then((title) => {
                        console.log(`\tElement's title is ${title}`);
                    });

                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    async setOrdersArray(): Promise<void> {
        console.log("  In 'setOrdersArray()' for 'OrdersTab'");
        return ElementMethods.getCustomElementArray('tr.order-tableRow', OrderRow).then(async (orderArray)=> {
            let resolvingPromise;
            this.orders = orderArray;

            for (let i = 0; i < this.orders.length; i++) {
                console.log("\tInitializing data row " + i);
                resolvingPromise = await this.orders[i].initialize();
            }

            return resolvingPromise;
        });
    }

    // Navigates to a patient info page and opens a Order Details modal.  It returns the modal object for further use.
    static async UniversalOpenOrdersModal(patientID: string = '1000'): Promise<OrderDetailsModal> {
        // console.log("   In 'UniversalOpenOrdersModal()' for 'OrdersTab'");
        let ordersTab: OrdersTab;             // the tab on the patient's details page

        return NavigationMethods.navigateToAPatientPageQuickly(patientID).then(()=> {
            return NavigationMethods.waitForLoadCompletion('table.visit-table').then(async ()=> {
                await OrdersTab.thisTab.click();
                return ordersTab = new OrdersTab();
            }).then(async()=> {
                return ordersTab.initialize().then(async ()=> {
                    await ordersTab.openOrdersModal();     //opens the Order Details modal
                    return ordersTab.orderDetailsModal;
                });
            });
        });
    }

    // will open a Order Details modal
    async openOrdersModal(): Promise<void> {
        console.log("   In 'openOrdersModal()' for 'OrdersTab'");

        // clicking the Order ID twice to ensure the first order row has a Order ID Number that can be clicked (opening the modal)
        await this.sortBy(this.orderIdHeader);
        await this.sortBy(this.orderIdHeader);
        return this.orders[0].clickOrderId().then(async ()=> {
            return this.orderDetailsModal.initialize();
        });
    }

    private async sortBy(header: ColumnHeader): Promise<void> {
        console.log("   In 'sortBy()' for 'OrdersTab'");

        await header.getTitle().then((title) => {
            console.log(`\tHeader's title is ${title}`);
        });

        return header.click().then(() => {
            console.log("\tHEADER CLICKED!");
            return this.setOrdersArray();
        });
    }
}


export class OrderRow {

    private initializePromise: Promise<void>;

    status: ElementFinder;
    orderId: ElementFinder;
    orderDateTime: ElementFinder;
    specimen: ElementFinder;
    locationSublocation: ElementFinder;
    priority: ElementFinder;

    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'OrderRow'");
    };

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrderRow'");

        if(!this.initializePromise) {
            // await GeneralUtilities.initializationMessage(this.element, 'OrderRow');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.status = await this.element.$('td.order-tableRow-statusCode');
                this.orderId = await this.element.$('td.order-tableRow-id');
                this.orderDateTime = await this.element.$('td.order-tableRow-orderDateTime');
                this.specimen = await this.element.$('td.order-tableRow-specimen');
                this.locationSublocation = await this.element.$('td.order-tableRow-locationId');
                this.priority = await this.element.$('td.order-tableRow-priorityCode');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async getStatus(): Promise<string> {
        return this.status.getText();
    }

    async getOrderId(): Promise<string> {
        return this.orderId.getText();
    }

    async getOrderDateTime(): Promise<string> {
        return this.orderDateTime.getText();
    }

    async getSpecimen(): Promise<string> {
        return this.specimen.getText();
    }

    async getLocationSublocation(): Promise<string> {
        return this.locationSublocation.getText();
    }

    async getPriority(): Promise<string> {
        return this.priority.getText();
    }

    async clickOrderId(): Promise<any> {
        console.log("   In 'clickOrderId()' for 'OrderRow'");

        return this.orderId.getText().then((orderIdNumber)=> {
            console.log(`      ... the Order ID number is ${orderIdNumber}`);
            if (orderIdNumber === "") {
                throw "This row does not contain an Order ID Number, meaning it cannot be clicked and the modal cannot be opened from here";
            } else {
                return this.orderId.click();
            }
        });
    }

}
