/** This file will be used to store misc. methods used for element manipulation */

import { $$, ElementFinder } from "protractor";
import {VisitRow} from "../objects/pages/patientDetails/tabCollection/tabVisit";
import {ProductRow} from "../objects/pages/patientDetails/tabCollection/tabProducts";
import {OrderRow} from "../objects/pages/patientDetails/tabCollection/tabOrders";
import {DiagnosisRow} from "../objects/pages/patientDetails/visitModal/tabDiagnosis";

export class ElementMethods {

    // This will find an element by the identifier and will create an array of that elementType
    static getCustomElementArray(identifier: string, elementType: string): Promise<any[]> {
        let finalArray = [];
        let elementArray = $$(identifier);

        return new Promise((resolve)=> {
            return elementArray.map((elements)=> {
                for (let i = 0; elements.length; i++) {
                    switch (elementType)
                    {
                        case "VisitRow":
                            finalArray.push(new VisitRow(elements[i]));
                            break;
                        case "ProductRow":
                            finalArray.push(new ProductRow(elements[i]));
                            break;
                        case "OrderRow":
                            finalArray.push(new OrderRow(elements[i]));
                            break;
                        case "DiagnosisRow":
                            finalArray.push(new DiagnosisRow(elements[i]));
                            break;
                        default:
                            throw new TypeError("No array conversion case established for custom element type '" + elementType + "'");
                    }
                }
            }).then(()=> {
                return resolve(finalArray);
            });
        });
    }

}


/**
 * This is used to ensure that class instances that require ElementFinder input return a Promise
 * It's not necessary for when an ElementFinder is not passed to the class instantiation
 */
export class ElementFactory {

    static make<T>(clazz: { new(ElementFinder): T; }, input: ElementFinder): Promise<T> {
        return new Promise(resolve => {
            return resolve(new clazz(input));
        });
    }

}