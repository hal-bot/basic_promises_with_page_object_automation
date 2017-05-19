import { ElementFinder, $ } from 'protractor';
import {ElementFactory} from "../../../utils/elementUtilities";

export class GlobalHeader {

    private initializePromise: Promise<void>;

    // the whole header object
    container: ElementFinder;

    // options
    dashboard: HeaderOption;
    patients: HeaderOption;
    orders: HeaderOption;

    // icons
    settings: ElementFinder;
    logout: ElementFinder;

    constructor() {
        // console.log("  In constructor for 'GlobalHeader'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'GlobalHeader'");

        if(!this.initializePromise) {
            console.log("     ... Initializing basic details of 'GlobalHeader'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.container = await $('div.app-header-nav-container');

                this.dashboard = await ElementFactory.make(HeaderOption, this.container.$('li.dashboard-header-nav'));
                this.patients = await ElementFactory.make(HeaderOption, this.container.$('li.patients-header-nav'));
                this.orders = await ElementFactory.make(HeaderOption, this.container.$('li.orders-header-nav'));

                // TODO: Update this code once these icons become enabled
                // this.settings = this.container.element(by.linkText("Patients"));
                // this.logout = this.container.element(by.linkText("Patients"));

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        // console.log("   In 'isPresent' for 'GlobalHeader'");
        await this.initialize();
        return this.container.isPresent();
    }

    async clickPatients() {
        // console.log("   In 'clickPatients' for 'GlobalHeader'");
        await this.initialize();
        return this.patients.click();
    }

}


class HeaderOption {

    link: ElementFinder;

    private initializePromise: Promise<void>;

    constructor(private element: ElementFinder) {
        // console.log("   In constructor for 'HeaderOption'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'HeaderOption'");

        if(!this.initializePromise) {
            // console.log("     ... Initializing basic details of 'HeaderOption'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.link = await this.element.$('a');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    // async open(): Promise<any> {
    //     if (this.isExpanded()) {
    //         return new Promise(()=> { });
    //     } else {
    //         return new Promise(()=> { this.link.click(); });
    //     }
    // }
    //
    // async close(): Promise<any> {
    //     if (this.isExpanded()) {
    //         return new Promise(()=> { this.link.click(); });
    //     } else {
    //         return new Promise(()=> { });
    //     }
    // }
    //
    // // Returns true if the option is expanded, false if not
    // async isExpanded(): boolean {
    //     //TODO: add logic here
    //     return false;
    // }

    async isPresent(): Promise<boolean> {
        // console.log("   In 'isPresent' for 'HeaderOption'");
        await this.initialize();
        return this.link.isPresent();
    }

    async click(): Promise<void> {
        // console.log("   In 'isPresent' for 'HeaderOption'");
        await this.initialize();
        return this.link.click();
    }

}