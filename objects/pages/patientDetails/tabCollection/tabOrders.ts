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
        super($('li.patient-orders-tab'));

        this.statusHeader = new ColumnHeader($('th.order-tableHeader-status'));
        this.orderIdHeader = new ColumnHeader($('th.order-tableHeader-orderID'));
        this.orderDateTimeHeader = new ColumnHeader($('th.order-tableHeader-orderDateTime'));
        this.specimenHeader = new ColumnHeader($('th.order-tableHeader-specimen'));
        this.locationSublocationHeader = new ColumnHeader($('th.order-tableHeader-locationSubLocation'));
        this.priorityHeader = new ColumnHeader($('th.order-tableHeader-priority'));

        this.setOrdersArray();
    };

    setOrdersArray(): Promise<any> {
        return ElementMethods.getCustomElementArray('tr.order-tableRow', 'OrderRow').then(function(orderArray) {
            return this.orders = orderArray;
        });
    }

}


export class OrderRow {
    status: ElementFinder;
    orderId: ElementFinder;
    orderDateTime: ElementFinder;
    specimen: ElementFinder;
    locationSublocation: ElementFinder;
    priority: ElementFinder;

    constructor(element) {
        this.status = element.$('td.order-tableRow-statusCode');
        this.orderId = element.$('td.order-tableRow-id');
        this.orderDateTime = element.$('td.order-tableRow-orderDateTime');
        this.specimen = element.$('td.order-tableRow-specimen');
        this.locationSublocation = element.$('td.order-tableRow-locationId');
        this.priority = element.$('td.order-tableRow-priorityCode');
    };

    getStatus(): Promise<string> {
        return new Promise(()=> { this.status.getText(); });
    }

    getOrderId(): Promise<string> {
        return new Promise(()=> { this.orderId.getText(); });
    }

    getOrderDateTime(): Promise<string> {
        return new Promise(()=> { this.orderDateTime.getText(); });
    }

    getSpecimen(): Promise<string> {
        return new Promise(()=> { this.specimen.getText(); });
    }

    getLocationSublocation(): Promise<string> {
        return new Promise(()=> { this.locationSublocation.getText(); });
    }

    getPriority(): Promise<string> {
        return new Promise(()=> { this.priority.getText(); });
    }

}
