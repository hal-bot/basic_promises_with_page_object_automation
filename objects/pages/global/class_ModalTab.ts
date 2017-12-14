/**
 *  Describes general objects in the modal tabs used
 */


import {ElementFinder, $, $$, browser} from "protractor";

export abstract class ModalTab {

    protected initializePromise: Promise<void>;
    actualTab: ElementFinder;
    contentContainer: ElementFinder;

    pages: ElementFinder[];             // the pages at the bottom of the modal
    leftArrow: ElementFinder;
    rightArrow: ElementFinder;

    // element will be the container which has all the data for the tab
    constructor(private tabElement: ElementFinder) {
        // console.log("  In constructor for abstract class 'ModalTab'");
    }

    async baseInitialize(): Promise<void> {
        // console.log("   In 'baseInitialize()' for abstract class 'ModalTab'");
        return new Promise<void>(async (resolve) => {
            this.actualTab = await this.tabElement;
            this.contentContainer = await $('div.modal-content div.tab-content');
            return resolve();
        });
    }

    // abstract async clickTab();
    public async baseClickTab(): Promise<{}> {
        // console.log("  In 'baseClickTab()' for abstract class 'ModalTab'");
        return this.actualTab.click().then(async ()=> {
            await browser.sleep(250);
            return this.initializePromise = null;           // doing this so that the page can be reinitialized, which should happen after this is called
        });
    }

    async isPresent(): Promise<boolean> {
        // console.log("  In 'isPresent()' for abstract class 'ModalTab'");
        return this.actualTab.isPresent();
    }

    // This will clear out the current 'pages' array and then get the array rows
    async setPages() {
        return this.pages = await $$('tab.active li.pagination-page');
    }
}