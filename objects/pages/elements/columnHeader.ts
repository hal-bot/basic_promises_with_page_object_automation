/** TODO - get the 'arrow' element working.  Currently it's not really working... but it's also not really important */

import { ElementFinder } from 'protractor';
import { ArrowIcon } from "./arrowIcon";
import {ElementFactory, ElementMethods} from "../../../utils/elementUtilities";
import {async} from "q";


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
            await ElementMethods.initializationMessage(this.element, 'ColumnHeader');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.headerElement = await this.element;
                // this.arrow = await ElementFactory.make(ArrowIcon, this.element);

                return resolve();
            }).then(async (resolve)=> {
                // console.log("\tNow initializing all elements just defined for 'ColumnHeader'");
                // await this.arrow.initialize();
                return resolve;
            });
        }

        return this.initializePromise;
    }

    async getHeaderTitle(): Promise<string> {
        return this.headerElement.getText();
    }

    async isPresent(): Promise<boolean> {
        return this.headerElement.isPresent();
    }

    async click(): Promise<any> {
        return this.headerElement.click();
    }
}