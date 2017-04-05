// Describes the whole Patient Details page.  Anything on that page should be accessible through this

import { $ } from 'protractor';
import {PatientInformation} from "./patientInformation";
import {VisitTab} from "./tabCollection/tabVisit";
import {OrdersTab} from "./tabCollection/tabOrders";
import {ProductsTab} from "./tabCollection/tabProducts";

export class PatientDetailsPage {

    patientInformation: PatientInformation;

    visitTab: VisitTab;
    ordersTab: OrdersTab;
    productsTab: ProductsTab;

    constructor() {
        this.patientInformation = new PatientInformation($(''));
        this.visitTab = new VisitTab();
        this.ordersTab = new OrdersTab();
        this.productsTab = new ProductsTab();
    }

}