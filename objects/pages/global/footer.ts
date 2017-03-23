import { ElementFinder, $, $$, protractor } from 'protractor';

export class GlobalFooter {

    // the whole header object
    container: ElementFinder;

    name: ElementFinder;
    location: ElementFinder;
    copyright: ElementFinder;
    safetraceLogo: ElementFinder;
    haemoneticsLogo: ElementFinder;

    constructor() {
        this.container = $('div.app-footer-container');

        this.name = $$('div.app-footer-info div')[0];
        this.location = $('');
        this.copyright = $$('div.list-inline li')[0];
        this.safetraceLogo = $('');
        this.haemoneticsLogo = $('');

    }

    isPresent(): Promise<boolean> {
        return this.container.isPresent();
    }

    address(): Promise<string> {
        return $('div.app-footer-copyright').getText().then(function(txt) {
            var regex = /Haemonetics.+/g;
            return regex.test(2)
        });
    }
}