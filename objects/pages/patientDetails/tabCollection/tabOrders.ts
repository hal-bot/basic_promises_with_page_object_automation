// Describes the "Orders" tab section seen on the Patient Details page

import { $, $$, ElementFinder } from 'protractor';
import {Tab} from "../class_Tab";
import {ColumnHeader} from "../../columnHeader";

class OrdersTab extends Tab {

    statusHeader: ColumnHeader;
    orderIdHeader: ColumnHeader;
    orderDateTimeHeader: ColumnHeader;
    specimenHeader: ColumnHeader;
    locationSublocationHeader: ColumnHeader;
    priorityHeader: ColumnHeader;

    orders: OrderRow[];

    constructor() {
        super($(''));

        this.statusHeader = new ColumnHeader($(''));
        this.orderIdHeader = new ColumnHeader($(''));
        this.orderDateTimeHeader = new ColumnHeader($(''));
        this.specimenHeader = new ColumnHeader($(''));
        this.locationSublocationHeader = new ColumnHeader($(''));
        this.priorityHeader = new ColumnHeader($(''));

        this.setOrdersArray();
    };


    // This will clear out the current 'visits' array and then get the array rows
    setOrdersArray() {
        this.orders = [];
        // TODO: FINISH THE CODE HERE
        // $$('').each.do(function(visit) {
        //     this.visits.push(new VisitRow(visit));
        // });
    }

}


class OrderRow {
    status: ElementFinder;
    orderId: ElementFinder;
    orderDateTime: ElementFinder;
    specimen: ElementFinder;
    locationSublocation: ElementFinder; // ??
    priority: ElementFinder;

    constructor(element) {
        this.status = element.$('');
        this.orderId = element.$('');
        this.orderDateTime = element.$('');
        this.specimen = element.$('');
        this.locationSublocation = element.$('');
        this.priority = element.$('');
    };

    getStatus(): Promise<string> {
        return this.status.getText();
    }

    getOrderId(): Promise<string> {
        return this.orderId.getText();
    }

    getOrderDateTime(): Promise<string> {
        return this.orderDateTime.getText();
    }

    getSpecimen(): Promise<string> {
        return this.specimen.getText();
    }

    getLocationSublocation(): Promise<string> {
        return this.locationSublocation.getText();
    }

    getPriority(): Promise<string> {
        return this.priority.getText();
    }

}
