import {ElementFinder, browser} from 'protractor';

export class arrowIcon {
    icon: ElementFinder;

    constructor(headerElement) {
        this.icon = headerElement.$('');

        //http://stackoverflow.com/questions/25496379/should-i-use-browser-or-ptor-protractor-getinstance
        browser.executeScript("return window.getComputedStyle($('.my-class')[0], ':after').content")
            .then(function(data){ console.log(arguments)});
    }

    arrowDirection(): string {
        // TODO: Add code here
        /**
         * Determine what denotes the arrow's direction
         * Return the direction
         */
        return "";
    }
}