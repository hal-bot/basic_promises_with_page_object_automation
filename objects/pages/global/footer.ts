import { ElementFinder, $ } from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export class GlobalFooter {

    // the whole header object
    private container: ElementFinder;

    name: ElementFinder;
    location: ElementFinder;
    copyright: ElementFinder;
    safetraceLogo: ElementFinder;
    haemoneticsLogo: ElementFinder;

    private initializePromise: Promise<void>;

    constructor() {
        // console.log("  In constructor for 'GlobalFooter'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'GlobalFooter'");

        if(!this.initializePromise) {
            // ElementMethods.initializationMessage(null, 'GlobalFooter');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('div.app-footer-container');

                this.name = await this.container.$('div.userName');
                this.location = await this.container.$('div.app-footer-copyright');
                this.copyright = await this.container.$('li.year_companyName');
                // TODO: Use REGEX to only return the years
                this.safetraceLogo = await this.container.$('img.safetracetxLogo');
                this.haemoneticsLogo = await this.container.$('img.haemoneticsLogo');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

    // // Will return the address w/out the copyright info and extra characters
    // //TODO: Address this when it's needed
    // address(): Promise<string> {
    //     return $('div.app-footer-copyright').getText().then(function(txt) {
    //         let regex = /Haemonetics.+/g;
    //         return regex.txt(2);
    //     });
    // }
}