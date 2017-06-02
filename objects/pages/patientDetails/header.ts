

import {ElementFinder, $} from "protractor";
import {ElementMethods} from "../../../utils/elementUtilities";

export class PatientPageHeader {

    private initializePromise: Promise<void>;

    container: ElementFinder;
    icon: ElementFinder;

    constructor() {
        // console.log("  In constructor for 'PatientPageHeader'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PatientPageHeader'");

        if(!this.initializePromise) {

            // await ElementMethods.initializationMessage(null, 'PatientPageHeader');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('div.page-header-content');
                this.icon = await this.container.$('img');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        return this.container.isPresent();
    }

    async title(): Promise<string> {
        return this.container.getText();
    }
}