import {ElementFinder, browser} from 'protractor';

export class ArrowIcon {

    private initializePromise: Promise<void>;

    icon: ElementFinder;

    constructor(private headerElement: ElementFinder) {
        // console.log("  In constructor for 'ColumnHeader'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'ColumnHeader'");

        if(!this.initializePromise) {
            // console.log("     ... Initializing basic details of 'ColumnHeader'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.icon = this.headerElement.$('');

                //http://stackoverflow.com/questions/25496379/should-i-use-browser-or-ptor-protractor-getinstance
                return browser.executeScript("return window.getComputedStyle($('.my-class')[0], ':after').content")
                    .then((data) => { console.log(arguments); })
                    .then(()=> { return resolve(); });
            });
        }

        return this.initializePromise;
    }

    // async arrowDirection(): string {
    //     // TODO: Add code here
    //     /**
    //      * Determine what denotes the arrow's direction
    //      * Return the direction
    //      */
    //     return "";
    // }
}