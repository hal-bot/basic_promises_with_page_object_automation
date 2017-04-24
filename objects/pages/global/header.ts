import { ElementFinder, $, by, protractor } from 'protractor';

export class GlobalHeader {

    // the whole header object
    container: ElementFinder;

    // options
    patients: HeaderOption;
    orders: HeaderOption;

    // icons
    settings: ElementFinder;
    logout: ElementFinder;

    constructor() {
        this.container = $('div.app-header-nav-container');

        this.patients = new HeaderOption(this.container.$('li.patients-header-nav'));
        this.orders = new HeaderOption(this.container.$('li.orders-header-nav'));

        // TODO: Update this code once these icons become enabled
        // this.settings = this.container.element(by.linkText("Patients"));
        // this.logout = this.container.element(by.linkText("Patients"));
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.container.isPresent(); });
    }

    //TODO: Create 'open' and 'close' methods for

}


class HeaderOption {

    link: ElementFinder;

    constructor(element: ElementFinder) {
        this.link = element.$('a');
    }

    open(): Promise<any> {
        if (this.isExpanded()) {
            return new Promise(()=> { });
        } else {
            return new Promise(()=> { this.link.click(); });
        }
    }

    close(): Promise<any> {
        if (this.isExpanded()) {
            return new Promise(()=> { this.link.click(); });
        } else {
            return new Promise(()=> { });
        }
    }

    // Returns true if the option is expanded, false if not
    isExpanded(): boolean {
        //TODO: add logic here
        return false;
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.link.isPresent(); });
    }

    click() {
        this.link.click();
    }

}