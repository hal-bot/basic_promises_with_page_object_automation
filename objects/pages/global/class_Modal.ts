/**
 *  Describes general objects in the modals used
 */


import {ElementFinder, $, browser} from "protractor";
import {NavigationMethods} from "../../../utils/navigationUtilities";
import {ElementMethods} from "../../../utils/elementUtilities";

export abstract class Modal {

    protected initializePromise: Promise<void>;

    containerCSSstring: string;
    container: ElementFinder;
    title: ElementFinder;
    protected closeButton: ElementFinder;

    constructor(private titleCSS: string) {
        // console.log("  In constructor for abstract class 'Modal' - titleCSS = " + this.titleCSS);
        this.containerCSSstring = 'div.modal-content';
    }

    async baseInitialize(): Promise<void> {
        // console.log("   In 'initialize' for abstract class 'Modal'");

        return new Promise<void>(async (resolve) => {
            // await ElementMethods.initializationMessage(null, 'abstract class - Modal');

            this.container = await $(this.containerCSSstring);     // use this to ensure the elements found below are only in the container
            this.title = await $(this.titleCSS);
            this.closeButton = await this.container.$('div.close-button');

            return resolve();
        });
    }

    async isPresent(): Promise<boolean> {
        // console.log("   In 'isPresent()' for abstract class 'Modal'");
        return this.container.isPresent();
    }

    async waitUntilModalIsLoaded(): Promise<boolean> {
        // console.log("   In 'waitUntilModalIsLoaded()' for abstract class 'Modal';   this.containerCSSstring = " + this.containerCSSstring);
        return NavigationMethods.waitForLoadCompletion(this.containerCSSstring);
    }

    async closeModal(): Promise<void> {
        // console.log("   In 'closeModal()' for abstract class 'Modal'");
        return this.closeButton.click().then(async ()=> {
            await browser.sleep(500);
            return this.initializePromise = null;
            //TODO - Replace the 'sleep' above with a way to determine when the modal element has disappeared
        });
    }

}