import {ElementFinder} from 'protractor';

export class Checkbox {

    label: ElementFinder;
    private box: ElementFinder;

    private initializePromise: Promise<void>;

    constructor(private container: ElementFinder) {
        // console.log("  In constructor for 'Checkbox'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'Checkbox'");

        if(!this.initializePromise) {
            // console.log("     ... Initializing basic details of 'Checkbox'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.label = await this.container.$('label');
                this.box = await this.container.$('input');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        return this.box.isPresent();
    }

    async select() {
        return this.box.isSelected()
            ? true
            : this.box.click();
    }

    async deselect() {
        return this.box.isSelected()
            ? this.box.click()
            : true;
    }

    async getLocation(): Promise<any> {
        return this.box.getLocation();
    }

    async attr(value: string): Promise<boolean> {
        return this.box.attr(value);
    }
}