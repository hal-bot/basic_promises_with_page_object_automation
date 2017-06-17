/** This file will be used to store misc. methods used for element manipulation */

import { $$, ElementFinder } from "protractor";
import {VisitRow} from "../objects/pages/patientDetails/visits/tabVisits";
import {ProductRow} from "../objects/pages/patientDetails/products/tabProducts";
import {DiagnosisRow} from "../objects/pages/patientDetails/visits/tabDiagnosis";
import {PatientSearchResultRow} from "../objects/pages/patientSearch";
import {OrderRow} from "../objects/pages/patientDetails/orders/tabOrders";

export class ElementMethods {

    // This will find an element by the identifier and will create an array of that elementType
    // static getCustomElementArray(identifier: string, elementType: string): Promise<any[]> {
    static getCustomElementArray(identifier: string, elementType: string): any {
        console.log(`      In 'getCustomElementArray()'  ...  identifier = ${identifier};  elementType = ${elementType}`);
        let finalArray = [];

        return new Promise(async (resolve)=> {
            let elements = await $$(identifier);
            // console.log("\t\tARRIVED 1.1 ... elements.length = " + elements.length);

            return elements.filter(async (element)=> {
                // console.log("\t\tARRIVED 2  ...  finalArray.length = " + finalArray.length);
                switch (elementType)
                {
                    case "VisitRow":
                        await finalArray.push(new VisitRow(element));
                        break;

                    // case "ProductRow":
                    //     await finalArray.push(new ProductRow(element));
                    //     break;
                    case "OrderRow":
                        await finalArray.push(new OrderRow(element));
                        break;

                    case "DiagnosisRow":
                        await finalArray.push(new DiagnosisRow(element));
                        break;
                    case "PatientSearchRow":
                        await finalArray.push(new PatientSearchResultRow(element));
                        break;
                    case "ElementFinder":
                        await finalArray.push(element);
                        break;
                    default:
                        throw new TypeError("No array conversion case established for custom element type '" + elementType + "'");
                }
                return resolve(finalArray);
            });
        });
    }


    // This will output the CSS class of the element passed in, along with the class type that's being initialized
    static initializationMessage(element: ElementFinder, classBeingInitialized: string = "NEEDS INFO"): Promise<void> {
        return new Promise<void>((resolve) => {
            if (element === null) {
                return resolve(console.log(`     ... Initializing basic details of '${classBeingInitialized}'`));
            } else {
                return element.getAttribute('class').then((elementClass) => {
                    return resolve(console.log(`     ... Initializing basic details of '${classBeingInitialized}' for element "${elementClass}"`));
                });
            }
        });
    }
}


/**
 * This is used to ensure that class instances that require ElementFinder input return a Promise
 * It's not necessary for when an ElementFinder is not passed to the class instantiation
 */
export class ElementFactory {

    static make<T>(clazz: { new(ElementFinder): T; }, input: ElementFinder): Promise<T> {
        // console.log("\tIn 'ElementFactory'");
        return new Promise(resolve => {
            return resolve(new clazz(input));
        });
    }

}