import { ElementFinder, $, by, protractor } from 'protractor';

export class GlobalHeader {

    // the whole header object
    container: ElementFinder;

    // options
    patients: HeaderOption;
    orders: HeaderOption;

    constructor() {
        this.container = $('app-header');
        this.patients = new HeaderOption(this.container.element(by.text("Patients")));
        this.orders = new HeaderOption(this.container.element(by.text("Orders")));
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

        return false;
    }


}