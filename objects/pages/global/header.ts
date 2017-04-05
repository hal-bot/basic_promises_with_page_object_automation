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
        this.container = $('div.app-header');

        this.patients = new HeaderOption(this.container.element(by.linkText("Patients")));
        this.orders = new HeaderOption(this.container.element(by.linkText("Orders")));

        // TODO: Update this code once these icons become enabled
        // this.settings = this.container.element(by.linkText("Patients"));
        // this.logout = this.container.element(by.linkText("Patients"));
    }

    isPresent(): Promise<boolean> {
        return this.container.isPresent();
    }

    //TODO: Create 'open' and 'close' methods for

}


class HeaderOption {

    link: ElementFinder;

    constructor(element: ElementFinder) {
        this.link = element;
    }

    open(): Promise<any> {
        if (this.isExpanded()) {
            let deferred = protractor.promise.defer();
            return deferred.promise;
        } else {
            return this.link.click();
        }
    }

    close(): Promise<any> {
        if (this.isExpanded()) {
            this.link.click();
        } else {
            let deferred = protractor.promise.defer();
            return deferred.promise;
        }
    }

    // Returns true if the option is expanded, false if not
    isExpanded(): boolean {
        //TODO: add logic here
        return false;
    }

    isPresent(): Promise<boolean> {
        return this.link.isPresent();
    }

    click() {
        this.link.click();
    }

}