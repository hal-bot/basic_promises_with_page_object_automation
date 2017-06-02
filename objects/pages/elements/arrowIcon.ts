/** Since the arrows are being defined in the code with '::before' CSS3 tags, can't really do much, so for now the arrow icon will be null **/
// TODO - figure out if there's a way to interact w/ the '::before' tag

import {ElementFinder, browser, $} from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export class ArrowIcon {

    private initializePromise: Promise<void>;

    icon;//: ElementFinder;

    constructor(private headerElement: ElementFinder) {
        // console.log("  In constructor for 'ArrowIcon'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'ArrowIcon'");

        if(!this.initializePromise) {
            // await ElementMethods.initializationMessage(this.headerElement, 'ArrowIcon');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                return browser.executeScript("return window.getComputedStyle(arguments[0], '::after').content;", this.headerElement).then((data) => {
                    // console.log(`   data = ${data}`);
                    this.icon = data;
                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    // async arrowDirection(): string {
    //     // TODO: Add code here
    //     /**
    //      * Determine what denotes the arrow's direction
    //      * Return the direction
    //      */
    //     return "";
    // }
}