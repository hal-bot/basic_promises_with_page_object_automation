import { ElementFinder, $ } from 'protractor';
import {promise} from "selenium-webdriver";
import {ElementMethods} from "../../../utils/elementUtilities";

export class PageHeader {

    private initializePromise: Promise<void>;

    // the whole page header
    private container: ElementFinder;

    icon: ElementFinder;
    title: ElementFinder;

    constructor() {
        // console.log("  In constructor for 'PageHeader'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PageHeader'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'PageHeader');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.container = await $('div.page-header-content');
                this.icon = await this.container.$('img');
                this.title = await this.container.$('.page-header-title');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async getText(): Promise<string> {
        await this.initialize();
        return this.title.getText();
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

}