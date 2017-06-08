// Describes the whole Patient Details page.  Anything on that page should be accessible through this

import {PatientInformation} from "./patientInformation";
import {VisitTab} from "./visits/tabVisit";
import {OrdersTab} from "./orders/tabOrders";
import {ProductsTab} from "./products/tabProducts";

export class PatientDetailsPage {

    patientInformation: PatientInformation;
    visitTab: VisitTab;
    ordersTab: OrdersTab;
    productsTab: ProductsTab;

    constructor() {
        this.patientInformation = new PatientInformation();
        this.visitTab = new VisitTab();
        this.ordersTab = new OrdersTab();
        this.productsTab = new ProductsTab();
    }

}