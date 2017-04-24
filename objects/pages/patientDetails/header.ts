

import {ElementFinder, $} from "protractor";

export class PatientPageHeader {

    container: ElementFinder;
    icon: ElementFinder;

    constructor() {
        this.container = $('div.page-header-content');
        this.icon = this.container.$('img');
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.container.isPresent(); });
    }

    title(): Promise<string> {
        return new Promise(()=> {
            return this.container.getText().then(function (txt) {
                return txt;
            });
        });
    }
}