/** This file will be used to store misc. methods used for element manipulation */

import { $$, ElementFinder } from "protractor";

export class ElementMethods {

    // This will find an element by the identifier and will create an array of that elementType
    static getCustomElementArray<T>(identifier: string, clazz: { new(ElementFinder): T; }): Promise<T[]> {
        // console.log(`      In 'getCustomElementArray()'  ...  identifier = ${identifier}`);
        let finalArray = [];

        return new Promise(async (resolve)=> {
            let elements = await $$(identifier);
            // console.log("\t\tARRIVED 1 ... elements.length = " + elements.length);

            return elements.filter(async (element)=> {
                // console.log("\t\tARRIVED 2  ...  finalArray.length = " + finalArray.length);
                await finalArray.push(new clazz(element));
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

    // This is used to help instantiate a class and can be seen being used in 'initialize()' methods
    static make<T>(clazz: { new(ElementFinder): T; }, input: ElementFinder): Promise<T> {
        // console.log("\tIn 'ElementFactory'");
        return new Promise(resolve => {
            return resolve(new clazz(input));
        });
    }

}