// Describes the "Orders" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import { ColumnHeader } from "../../elements/columnHeader";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {PageTab} from "../class_PageTab";
import {GeneralUtilities} from "../../../../utils/generalUtilities";

export class OrdersTab extends PageTab {

    statusHeader: ColumnHeader;
    orderIdHeader: ColumnHeader;
    orderDateTimeHeader: ColumnHeader;
    specimenHeader: ColumnHeader;
    locationSublocationHeader: ColumnHeader;
    priorityHeader: ColumnHeader;

    orders: OrderRow[];

    constructor() {
        // console.log("  In constructor for 'OrdersTab'");
        super($('li.patient-orders-tab'));
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrdersTab'");

        if(!this.initializePromise) {
            await super.baseInitialize();

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

                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    async setOrdersArray(): Promise<void> {
        // console.log("  In 'setOrdersArray()' for 'OrdersTab'");
        return ElementMethods.getCustomElementArray('tr.order-tableRow', OrderRow).then(async (orderArray)=> {
            let resolvingPromise;
            this.orders = orderArray;

            for (let i = 0; i < this.orders.length; i++) {
                // console.log("Initializing data row " + i);
                resolvingPromise = await this.orders[i].initialize();
            }

            return resolvingPromise;
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

}
