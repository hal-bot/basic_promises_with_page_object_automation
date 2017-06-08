/**
 *  Describes general objects in the modal tabs used
 */


import {ElementFinder, $} from "protractor";

export abstract class ModalTab {

    protected initializePromise: Promise<void>;
    actualTab: ElementFinder;
    contentContainer: ElementFinder;

    // element will be the container which has all the data for the tab
    constructor(private tabElement: ElementFinder) {
        // console.log("  In constructor for abstract class 'ModalTab'");
    }

    async initialize(): Promise<void> {
        console.log("   In 'initialize()' for abstract class 'ModalTab'");

        return new Promise<void>(async (resolve) => {
            this.actualTab = await this.tabElement;
            this.contentContainer = await $('div.modal-content div.tab-content');
            return resolve();
        });
    }

    // abstract async clickTab();
    async clickTab(): Promise<{}> {
        console.log("  In 'clickTab()' for abstract class 'ModalTab'");
        return this.actualTab.click().then(()=> {
            console.log("    MODAL TAB CLICKED");
            this.initializePromise = null;
            return new Promise(()=> { return this.initialize(); });
        });
    }

    async isPresent(): Promise<boolean> {
        console.log("  In 'isPresent()' for abstract class 'ModalTab'");
        return this.actualTab.isPresent();
    }
}