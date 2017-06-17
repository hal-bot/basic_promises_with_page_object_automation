/** TODO - get the 'arrow' element working.  Currently it's not really working... but it's also not really important */

import { ElementFinder } from 'protractor';
import { ArrowIcon } from "./arrowIcon";
import {ElementFactory, ElementMethods} from "../../../utils/elementUtilities";


export class ColumnHeader {

    private initializePromise: Promise<void>;

    headerElement: ElementFinder;
    // arrow: ArrowIcon;

    constructor(private element: ElementFinder) {
        // console.log("  In constructor for 'ColumnHeader'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'ColumnHeader'");

        if(!this.initializePromise) {
            // await ElementMethods.initializationMessage(this.element, 'ColumnHeader');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.headerElement = await this.element;
                // this.arrow = await ElementFactory.make(ArrowIcon, this.element);

                return resolve();
            // }).then(async (resolve)=> {
            //     // console.log("\tNow initializing all elements just defined for 'ColumnHeader'");
            //     // await this.arrow.initialize();
            //     return resolve;
            });
        }

        return this.initializePromise;
    }

    async getTitle(): Promise<string> {
        return this.headerElement.getText();
    }

    async isPresent(): Promise<boolean> {
        return this.headerElement.isPresent();
    }

    async click(): Promise<any> {
        // console.log("  In 'click()' for 'ColumnHeader'");
        return this.headerElement.click();
    }

    // Will return TRUE if the column header is currently being used for sorting, FALSE if not
    async isBeingUsedForSorting(): Promise<boolean> {
        // console.log("  In 'isBeingUsedForSorting()' for 'ColumnHeader'");
        return this.headerElement.getAttribute('class').then((headerClass)=> {
            // console.log(`\tThe header's class is '${headerClass}'`);
            return headerClass.includes('sorted');
        });
    }
}