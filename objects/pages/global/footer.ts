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

        $$('div.app-footer-info div').then(function(nameArray) {
            console.log("  array length = " + nameArray.length);
            console.log("  array = " + nameArray);
            console.log("  array[0] = " + nameArray[0]);
            console.log("  array[1] = " + nameArray[1]);
            // nameArray.getText().then(function(txt) {
            //     console.log("  array.txt = " + txt);
            // });
            // nameArray[0].getText().then(function(txt) {
            //     console.log("  array0.txt = " + txt);
            // });
            // nameArray[1].getText().then(function(txt) {
            //     console.log("  array1.txt = " + txt);
            // });
            this.name = $$('div.app-footer-info div')[0];
        });
        // this.location = $('');
        // this.copyright = $$('div.list-inline li')[0];
        // let footerImages = $$('div.app-footer-logo-container');
        // this.safetraceLogo = footerImages[0];
        // this.haemoneticsLogo = footerImages[1];

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