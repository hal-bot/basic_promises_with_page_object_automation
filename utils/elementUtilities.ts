/** This file will be used to store misc. methods used for element manipulation */

import { $$ } from "protractor";
import {VisitRow} from "../objects/pages/patientDetails/tabCollection/tabVisit";
import {ProductRow} from "../objects/pages/patientDetails/tabCollection/tabProducts";
import {OrderRow} from "../objects/pages/patientDetails/tabCollection/tabOrders";

export class ElementMethods {

    // This will find an element by the identifier and will create an array of that elementType
    static getCustomElementArray(identifier: string, elementType: string): Promise<any[]> {
        let finalArray = [];
        let elementArray = $$(identifier);

        return elementArray.map(function(elements){
            return elements;
        }).then(function(elements){
            for (let i = 0; elements.length; i++) {
                switch (elementType)
                {
                    case "VisitRow":
                        this.finalArray.push(new VisitRow(elements[i]));
                        break;
                    case "ProductRow":
                        this.finalArray.push(new ProductRow(elements[i]));
                        break;
                    case "OrderRow":
                        this.finalArray.push(new OrderRow(elements[i]));
                        break;
                    default:
                        throw new TypeError("No array conversion case established for custom element type'" + elementType + "'");
                }
            }
        }).then(function() {
            return this.finalArray;
        });
    }

}