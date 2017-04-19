import { ElementFinder, $, $$ } from 'protractor';

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

        this.name = this.container.$('div.userName');
        this.location = this.container.$('div.app-footer-copyright');
        this.copyright = this.container.$('li.year_companyName');
        // TODO: Use REGEX to only return the years
        this.safetraceLogo = this.container.$('img.safetracetxLogo');
        this.haemoneticsLogo = this.container.$('img.haemoneticsLogo');
    }

    isPresent(): Promise<boolean> {
        return this.container.isPresent();
    }

    // // Will return the address w/out the copyright info and extra characters
    // //TODO: Address this when it's needed
    // address(): Promise<string> {
    //     return $('div.app-footer-copyright').getText().then(function(txt) {
    //         let regex = /Haemonetics.+/g;
    //         return regex.txt(2);
    //     });
    // }
}