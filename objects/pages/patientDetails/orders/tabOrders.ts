// Describes the "Orders" tab section seen on the Patient Details page

import { $, ElementFinder } from 'protractor';
import { PageTab } from "../class_PageTab";
import { ColumnHeader } from "../../elements/columnHeader";
import {ElementMethods} from "../../../../utils/elementUtilities";

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
    };

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitTab'");

        if(!this.initializePromise) {
            await super.baseInitialize();

            // await ElementMethods.initializationMessage(null, 'VisitTab');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.statusHeader = new ColumnHeader($('th.order-tableHeader-status'));
                this.orderIdHeader = new ColumnHeader($('th.order-tableHeader-orderID'));
                this.orderDateTimeHeader = new ColumnHeader($('th.order-tableHeader-orderDateTime'));
                this.specimenHeader = new ColumnHeader($('th.order-tableHeader-specimen'));
                this.locationSublocationHeader = new ColumnHeader($('th.order-tableHeader-locationSubLocation'));
                this.priorityHeader = new ColumnHeader($('th.order-tableHeader-priority'));

                return this.setOrdersArray().then(async ()=> {
                    await this.statusHeader.initialize();
                    await this.orderIdHeader.initialize();
                    await this.orderDateTimeHeader.initialize();
                    await this.specimenHeader.initialize();
                    await this.locationSublocationHeader.initialize();
                    await this.priorityHeader.initialize();
                });
            });
        }

        return this.initializePromise;
    }

    async setOrdersArray(): Promise<any> {
        return ElementMethods.getCustomElementArray('tr.order-tableRow', 'OrderRow').then(async (orderArray)=> {
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
        // console.log("  In constructor for 'VisitRow'");
    };

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitRow'");

        if(!this.initializePromise) {
            // await ElementMethods.initializationMessage(this.element, 'VisitRow');

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
